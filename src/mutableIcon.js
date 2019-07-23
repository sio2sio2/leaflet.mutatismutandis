import {Options, load} from "./utils/index.js";

/**
 * Genera un `HTMLElement
 * <https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement>`_ a partir del
 * parámetro que se le proporciona.
 * 
 * @param {(HTMLElement|Document|DocumentFragment|String)} Definición del elemento.
 *
 * @returns {HTMLElement} El elemento generado.
 */
function getElement(e) {
   if(typeof e === "string" || e instanceof String) {
      e = new DomParser().parseFromString("<div>" + e + "</div>", 'text/html');
      e.container = true;
   }
   else if(e instanceof Document || e instanceof DocumentFragment) {
      if(e.children.length === 1) {
         e = e.firstElementChild.cloneNode(true);
         e.container = false;
      }
      else {
         const container = document.createElement("div");
         for(const x of e.children) container.appendChild(x.cloneNode(true));
         e = container;
         e.container = true;
      }
   }
   else if(e instanceof HTMLElement) {
      e = e.cloneNode(true);
      e.container = false;
   }
   else throw new TypeError("Tipo de elemento no soportado");
   return e;
}


/**
 * @name L.MutableIcon
 * @extends L.DivIcon
 * @classdesc Extensión de `L.DivIcon <https://leafletjs.com/reference-1.4.0.html#divicon>`_
 * a fin de crear iconos definidos por una plantilla a la que se aplican
 * cambios en sus detalles según sean cambien los valores de sus opciones de
 * dibujo. Consulte :js:attr:`Icon.options` para conocer cuales son las
 * opciones adicionales que debe proporcionar para que la clase sea capaz de
 * manejar iconos mutables.
 *
 * .. warning:: Para crear el icono, use preferente la función :js:func:`L.utils.createMutableIconClass`.
 *
 * @class
 * @hideconstructor
 *
 * @example
 * function updater(o) {
 *    const content = this.querySelector(".content");
 *    if(o.hasOwnProperty(tipo) content.className = "content " + o.tipo;
 *    if(o.hasOwnProperty(numadj) content.textContent = o.numadj;
 *    return this;
 * }
 *
 * const Icon = L.MutableIcon.extend({
 *    options: {
 *       className: "icon",
 *       iconSize: [25, 34],
 *       iconAnchor: [12.5, 34],
 *       url: "images/boliche.svg",
 *       updater: updater,
 *       converter: new L.utils.Converter(["numadj", "tipo"])
 *                             .define("numadj", "adj", a => a.total)
 *                             .define("tipo")
 *    }
 * });
 *
 * const icon = new Icon();
 */
export default L.DivIcon.extend({
   /** @lends L.MutableIcon.prototype */
   // Issue #2
   statics: {
      /** @lends L.MutableIcon */

      /**
       * Informa si la clase de icono se encuentra lista para utilizarse.
       * @type {Boolean}
       */
      isready() {
         return !!this.prototype.options.html;
      },
      /**
       * Define qué hacer cuando la clase de icono esté lista para usarse.
       * @async
       *
       * @param {Function} success  Define la acción que se realizará en caso
       * de que la creación de la clase de icono haya tenido éxito.
       * @param {Function} fail Define la acción a realizar en caso de que
       * la creación del icono haya fallado.
       */
      onready: function(func_success, func_fail) {
         if(!this.isready()) {
            if(this._onprocess) {  // Ya está pedido el fichero, así que esperamos.
               const id = setInterval(() => {
                  if(this.isready()) {
                     clearInterval(id);
                     delete this._onprocess;
                     func_success();
                  }
               }, 20);
            }
            else {
               this._onprocess = true;
               load({
                  url: this.prototype.options.url,
                  callback: xhr => {
                     this.prototype.options.html = getElement(xhr.responseXML);
                     delete this._onprocess;
                     func_success();
                  },
                  failback: xhr => {
                     delete this._onprocess;
                     func_fail(xhr.statusText);
                  }
               });
            }
         }
         else func_success();
         return this;
      },
      // Para comprobar que se incluyeron updater y converter
      extend: function(obj) {
         const MutableIcon = L.Icon.extend.call(this, obj);
         const options = MutableIcon.prototype.options;
         if(options.updater && options.converter) {
            if(options.html) options.html = getElement(options.html);
            else if(!options.url) throw new Error("Falta definir las opciones html o url");
         }
         else throw new Error("Un icono mutable requiere funciones updater y converter");
         return MutableIcon;
      }
   },
   // Fin issue #2
   /**
    * Wrapper para el método homónimo de `L.DivIcon
    * <https://leafletjs.com/reference-1.4.0.html#divicon>`_. Su función
    * es preparar el valor ``options.html`` usando la plantilla y 
    * las opciones de dibujo antes de que el método original actúe.
    * 
    *
    * @returns {HTMLElement}
    */
   createIcon: function() {
      this.options.params = this.options.params || new Options(this.options.converter.run(this._marker.getData()));

      // Las opciones de dibujo cambiaron mientras el icono no estaba presente en el mapa.
      if(!this.options.params.updated) {
         delete this.options.html;
         this._marker.fire("iconchange", {reason: "draw", opts: this.options.params._updated});  // Issue #86
      }

      if(!this.options.hasOwnProperty("html")) {
         const html = this.options.html.cloneNode(true);
         html.container = this.options.html.container;
         this.options.updater.call(html, this.options.params);
         if(html.container !== undefined) this.options.html = html.container?html.innerHTML:html.outerHTML;
         this.options.params.reset();
      }

      const div = L.DivIcon.prototype.createIcon.call(this, arguments);
      // Issue #5
      const filter = this._marker.options.filter;
      if(filter && this._marker.filtered && !filter.hideable) {
         filter.transform.call(div, true);
      }
      // Fin issue #5
      return div
   },
   /**
    * Refresca el icono, en caso de que hayan cambiado las opciones de dibujo.
    * El método modifica directamente el HTML sobre el documento.
    * @memberof Icon.prototype
    *
    * @return {Boolean} ``true`` si se redibujó realmente el icono.
    */
   refresh: function() {
      if(!this.options.params || this.options.params.updated) return false;
      this.options.updater.call(this._marker.getElement(), this.options.params.modified);
      this._marker.fire("iconchange", {reason: "redraw", opts: this.options.params._updated});  // Issue #86
      this.options.params.reset();

      // Si se cambia el icono dibujado, el options.html guardado ya no vale.
      delete this.options.html;
      return true;
   },
});
