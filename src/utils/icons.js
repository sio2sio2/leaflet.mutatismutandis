// Issue #5
/**
 * Pone en escala de grises un icono filtrado o elimina
 * tal escala si ya no lo está.
 *
 * @this El elemento HTML del documento dentro del cual se encuentra
 * definida la marca 
 *
 * @param {boolean} filtered  Si el icono está filtrado o no.
 */
export function grayFilter(filtered) {
   if(filtered) this.style.filter = "grayscale(100%)";
   else this.style.removeProperty("filter");
}

/**
 * Redefine ``iconCreateFunction`` basándose en la definición original de
 * `L.MarkerClusterGroup <https://github.com/Leaflet/Leaflet.markercluster>`_
 * para que el número del clúster sólo cuente los centros no filtrados.
 *
 * @param {L.MarkerCluster} cluster El cluster sobre el que se aplica la función.
 */
export function noFilteredIconCluster(cluster) {
   const childCount = cluster.getChildCount(),
         noFilteredChildCount = cluster.getAllChildMarkers().filter(e => !e.filtered).length;

   let c = ' marker-cluster-';
   if (childCount < 10) {
      c += 'small';
   } else if (childCount < 100) {
      c += 'medium';
   } else {
      c += 'large';
   }

   return new L.DivIcon({ html: '<div><span>' + noFilteredChildCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
}
// Fin issue #5


// Issue #2
/**
 * Facilita la construcción de clases de iconos. Cada clase está asociada
 * a un estilo de icono distinto.
 *
 * @param {string} name          Nombre identificativo para la clase de icono.
 * @param {Object} options       Opciones de construcción de la clase.
 * @param {string} options.css   Para un icono creado con CSS, el archivo .css.
 *    que define el aspecto.
 * @param {string|DocumentFragment|Document} options.html  HTML que define la
 * plantilla del icono. Se puede pasar como:
 *    
 * * Una cadena que contenga directamente el código HTML.
 * * Un ``DocumentFragment``, que sería lo que se obtiene como
 *   contenido de un ``<template>``.
 * * Un ``Document``, que sería lo que se obtiene de haber hecho
 *   una petición AJAX y quedarse cn la respuesta XML.
 *
 * @param {string} options.url   Alternativamente a la opción anterior,
 * la URL de un archivo donde está definido el icono (p.e. un SVG).
 *
 * @param {L.utils.Converter} options.converter  Objeto :class:`L.utils.Converter`
 * para la conversión de los datos en opciones de dibujo.
 *    
 * @param {Function} updater  Función que actualiza el aspecto del icono
 *    a partir de los nuevos valores que tengan las opciones de dibujo.
 *    Toma las opciones de dibujo (o una parte de ellas) y modifica el
 *    elemento DIV (o SVG. etc.) del icono para que adquiera un aspecto
 *    adecuado. Debe escribirse teniendo presente que pueden no pasarse todas
 *    las opciones de dibujo, sino sólo las que se modificaron desde
 *    la última vez que se dibujó el icono. Por tanto, debe escribirse la
 *    función para realizar modificaciones sobre el aspecto preexistente
 *    del icono, en vez de escribirse para recrear el icono desde la plantilla
 *
 * @retuns {Icon} La clase de icono que se desea crear.
 *
 * @example
 * function updater(o) {
 *    const content = this.querySelector(".content");
 *    if(o.hasOwnProperty(tipo) content.className = "content " + o.tipo;
 *    if(o.hasOwnProperty(numadj) content.textContent = o.numadj;
 *    return this;
 * }
 *
 * const Icon = L.utils.createMutableIconClass("chupachups", {
 *    iconSize: [25, 34],
 *    iconAnchor: [12.5, 34],
 *    css: "styles/chupachups.css",
 *    html: '<div class="content"><span></span></div><div class="arrow"></div>',
 *    converter: new L.utils.Converter(["numadj", "tipo"])
 *                          .define("numadj", "adj", a => a.total)
 *                          .define("tipo")
 *    updater: updater
 * });
 */
export function createMutableIconClass(name, options) {

   const mutable = options.updater && options.converter

   if(options.css) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = options.css;
      link.id = "leafext-css-" + name;
      document.querySelector("head").appendChild(link);
      delete options.css
   }

   options.className = options.className || name;

   // Además de devolver el icono, lo precargamos en caso
   // de que hubiera que ir a buscarlo en uin fichero externo
   if(mutable) return L.MutableIcon.extend({options: options}).onready(() => true);
   else {
      console.warn("Falta updater o converter: el icono no será mutable");
      return L.DivIcon.extend({options: options});
   }
   
}
// Fin issue #2
