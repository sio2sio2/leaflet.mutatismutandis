// Issue #5
import {equals} from "./utils/index.js";

/**
 * Construye un sistema de filtros
 * @name FilterSys
 * @class
 * @param {Function|L.LayerGroup|string} style  Estilo de filtrado.
 * Consulte la opción ``filter`` de las :js:attr:`optiones de Marker <Marker.options>`
 * para conocer cuáles son sus valores posibles.
 * @classdesc Implementa un sistema de filtros para las marcas.
 * Las :js:class:`clases de marcas definidas como mutables <Marker>` definen
 * una propiedad ``filter`` que es un objeto de este tipo, de modo que los métodos
 * que definen o aplican filtros a las marcas de la clase (:js:meth:`Marker.registerF`,
 * :js:meth:`Marker.filter`, :js:meth:`Marker.unfilter`),
 * utilizan este objeto.
 */
function FilterSys(style) {
   Object.defineProperties(this, {
      transform: {
         get: function() { return this._transform; },
         set: function(value) { 
            if(this.hideable) this.transform.off("layeradd", this.ejectFiltered);
            if(typeof value === "string") {
               this._transform = function(filtered) {
                  if(filtered) this.classList.add(value);
                  else this.classList.remove(value);
               }
            }
            else {
               this._transform = value; 
               if(this.hideable) this.transform.on("layeradd", this.ejectFiltered);
            }
         },
         configurable: false,
         enumerable: false
      },
      _transform: {
         writable: true,
         enumerable: false,
         configurable: false
      }
   });
   this.transform = style;
}

/**
 * Informa de si la marca debe ocultarse.
 * @name FilterSys#hideable
 * @type {Boolean}
 */
Object.defineProperty(FilterSys.prototype, "hideable", {
   get: function() { return this.transform instanceof L.LayerGroup; },
   configurable: false,
   enumerable: false
});

/**
 * Expulsa automáticamente de la capa las marcas filtradas.
 * @method FilterSys#ejectFiltered
 */
FilterSys.prototype.ejectFiltered = e => e.layer.refresh();

/**
 * Registra una corrección
 * @memberof FilterSys
 *
 * @param {String}  name  Nombre del filtro.
 * @param {Object}  obj   Propiedades del filtro.
 * @param {String|Array.<String>} obj.attrs Nombre de las propiedades de los datos
 * cuyos valores afecta al filtro.
 * @param {Function} obj.func  Función que filtra. Debe devolver
 * ``true`` (sí filtra) o ``false``.
 */
FilterSys.prototype.register = function(name, obj) {
   if(this[name]) {
      console.warn(`${name}: El filtro ya está registrado`);
      return false;
   }
   if(!(obj.attrs instanceof Array)) obj.attrs = [obj.attrs];
   obj.func.prop = {
      depends: obj.attrs,
      enabled: false,
      params: undefined
   }
   this[name] = obj.func;
   return this;
}

/**
 * Devuelve los filtros habilitados cuyo resultados dependen de
 * la propiedad cuyo nombre se suministra
 * @memberof FilterSys
 *
 * @param {?String} attr Nombre de la propiedad. Si no se facilita, devuelve
 *    todos los filtros habilitados.
 *
 * @retuns  {Array.<string>}   Los nombres de los filtros.
 */
FilterSys.prototype.getFilters = function(attr) {
   return Object.keys(this).filter(filter => 
      this[filter].prop.enabled
   && (
         !attr
         || this[filter].prop.depends.indexOf(attr) !== -1
      )
   );
}

/**
 * Habilita un filtro
 * @memberof FilterSys
 *
 * @param {String} name  El nombre del filtro que se quiere habilitar.
 */
FilterSys.prototype.enable = function(name) {
   if(!this.hasOwnProperty(name) || this[name].prop.enabled) return false;
   this[name].prop.enabled = true;
   return this;
}

/**
 * Deshabilita un filtro
 * @memberof FilterSys
 *
 * @param {string} name  El nombre del filtro que se quiere deshabilitar.
 */
FilterSys.prototype.disable = function(name) {
   if(!this.hasOwnProperty(name) || !this[name].prop.enabled) return false;
   this[name].prop.enabled = false;
   this[name].prop.params = undefined;
   return this;
}

/**
 * Establece unas nuevas opciones de aplicación para el filtro.
 * @memberof FilterSys
 *
 * @params {String} name   Nombre del filtro.
 * @params {Object} opts   Opciones de aplicación del filtro.
 * @params {Boolean} enable   Fuerza a habilitar el filtro.
 *
 * @returns {(Boolean|FilterSys)} <code>false</code> en caso de que el filtro
 *    no exista, esté deshabilitado, o estuviera habilitado, pero con
 *    las mismas opciones.
 */
FilterSys.prototype.setParams = function(name, opts, enable) {
   if(!this.hasOwnProperty(name)) return false;
   if(!enable && !this[name].prop.enabled) return false;  // No se fuerza la habilitación y no está habilitado.
   else this[name].prop.enabled = true;
   if(equals(this[name].prop.params, opts)) return false;
   this[name].prop.params = opts;
   return this;
}

/**
 * Obtiene las opciones de filtrado de un determinado filtro.
 * @memberof FilterSys
 *
 * @param {string} name    El nombre del filtro.
 *
 * @return {Object}
 */
FilterSys.prototype.getParams = function(name) {
   if(!this.hasOwnProperty(name)) throw new Error(`${name}: filtro no registrado`);
   return this[name].prop.params;
}

/**
 * Modifica el estilo de filtrado.
 * @memberof FilterSys
 *
 * @param {Function|L.LayerGroup|String} style  Estilo de filtrado. Consulte el
 * {@link Marker#options valor de la opción filter para Marker.prototype.options}
 * @param {Marker} markerClass    Clase de marca a la que pertenecen
 *    todas las marcas que usan este objeto de filtrado.
 */
FilterSys.prototype.setStyle = function(style, markerClass) {
   const old = this.transform,
         exhideable = old instanceof L.LayerGroup;
   this.transform = style;

   // Si el estilo anterior ocultaba las marcas y el nuevo no lo hace,
   // las marcas filtradas deben añadirse a la capa y ésta debe pasarse
   // a refresh como parámetro.
   markerClass.invoke("refresh", null, exhideable && !this.hideable && old);
}

// Issue #40
/**
 * Resetea el objeto.
 *
 * @param {Boolean} deep  Si ``true``, elimina del sistema los filtros;
 * de lo contrario, sólo los marca como desaplicados.
 */
FilterSys.prototype.reset = function(deep) {
   if(deep) for(const name in this) delete this[name];
   else for(const name in this) this.disable(name);
   return this;
}
// Fin issue #40

export default FilterSys;
