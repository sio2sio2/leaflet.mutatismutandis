/**
 * Realiza peticiones `AJAX
 * <https://developer.mozilla.org/es/docs/Web/Guide/AJAX>`_. Las peticiones
 * serán asíncronas, a menos que no se proporcionen función de *callback* ni
 * *failback*.
 *
 * @param {Object} params Objeto que contiene los parámetros para realizar
 *    la petición.
 * @param {String} params.url URL de la petición.
 * @param {String} params.method  Método HTTP de petición. Por defecto, será
 * ``GET``, si no se envía parámetros y ``POST``, si sí se hace.
 * @param {Object} params.params Parámetros que se envían en la petición
 * @param {Function} params.callback   Función que se ejecutará si la
 * petición tiene éxito. La función tendrá como único argumento el objeto
 * `XMLHttpRequest <https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest>`_.
 * @param {Function} params.failback   Función que se ejecutará cuando
 * la petición falle. También admite como argumento un objeto
 * ``XMLHttpRequest``.
 * @param {Object} params.context Objeto que usará como contexto las funciones
 * de *callback* y *failback*.
 *
 * @example
 *
 * load({
 *    url: 'image/centro.svg',
 *    callback: function(xhr) { console.log("Éxito"); },
 *    failback: function(xhr) { console.log("Error"); },
 * });
 *
 */
export function load(params) {
   const xhr = new XMLHttpRequest();
   let qs = '', 
       method = (params.method || (params.params?"POST":"GET")).toUpperCase(),
       contentType = params.contentType ||  "application/x-www-form-urlencoded";

   if(params.params) {
      if(method === "GET" || params.contentType === "application/x-www-form-urlencoded") {
         qs = Object.keys(params.params).map(k => k + "=" + encodeURIComponent(params.params[k])).join('&');
      }
      else if(params.contentType.indexOf("application/json") !== -1) {
         qs = JSON.stringify(params.params);
      }
      else throw new Error(`${params.contentType}: Tipo de contenido no soportando`);

      if(method === "GET") {
         params.url = params.url + "?" + qs;
         qs = "";
      }
   }

   xhr.open(method, params.url, !!params.callback);
   for(const header in params.headers || {}) {
      xhr.setRequestHeader(header, params.headers[header]);
   }
   if(method === "POST") xhr.setRequestHeader("Content-Type", params.contentType);

   if(params.callback || params.failback) {
      xhr.onreadystatechange = function() {
          if(xhr.readyState === 4) {
            if (xhr.status === 200) {
               if(params.callback) {
                  if(params.context) params.callback.call(params.context, xhr);
                  else params.callback(xhr);
               }
            }
            else if(params.failback) {
               if(params.context) params.failback.call(params.context, xhr);
               else params.failback(xhr);
            }
          }
      };
      if(params.url.endsWith(".html")) { // Permite para las respuestas HTML, obtener un responseXML
         xhr.responseType = "document";
      }
   }

   xhr.send(qs);

   // Sólo es útil cuando la petición es síncrona.
   return xhr;
}

/**
 * Devuelve el valor de la propiedad "anidada" de un objeto,
 * aunque comprueba que la no propiedad no sea realmente anidada.
 * @function
 *
 * @param {Object}  obj  El objeto del que se busca la propiedad.
 * @param {String}  name El nombre de la propiedad anidada.
 *
 * @example
 *
 * o = {a:1, b: {c:2, d:3}}
 * geProperty(o, "b.c") === o.b.c  // true
 * o = {a:1, "b.c": 2, "b.d": 3}
 * geProperty(o, "b.c") === o["b.c"]  // true
 */
export function getProperty(obj, name) {
   return obj.hasOwnProperty(name)?obj[name]
                                  :name.split(".").reduce((o, k) => o && o.hasOwnProperty(k)?o[k]:undefined, obj);
}

/**
 * Comprueba si dos objetos son iguales a efectos de lo requerido
 * en este código.
 *
 * @param {Object} o  Un objeto.
 * @param {Object} p  El otro.
 *
 * @returns {Boolean}
 */
export function equals(o,p) {
   if(typeof o !== typeof p) return false;
   if(typeof o !== "object" || o === null) return o == p;  // Comparación laxa.

   const oprop = Object.getOwnPropertyNames(o);
   const pprop = Object.getOwnPropertyNames(p);

   if(oprop.length !== pprop.length) return false;

   // Si es un array, los array se consideran iguales
   // si contienen los mismos elementos aunque no estén
   // en el mismo orden.
   if(o instanceof Array) {
      for(const eo of o) {
         let found = false;
         for(const ep of p) {
            if(equals(eo, ep)) {
               found = true;
               break;
            }
         }
         if(!found) return false;
      }
   }
   else {
      for(let i=0; i<oprop.length; i++) {
         const name = oprop[i];
         if(!equals(o[name], p[name])) return false;
      }
   }
   return true;
}


/**
 * Función que compara las opciones de aplicación de una corrección
 * para conocer si las nuevas opciones ya están incluidas en las primeras.
 * Es aplicable cuando las opciones están constituidas por dos atributos:
 *
 * - Uno que sea un array que contiene los valores que deben ser purgados.
 * - Otro, llamado "inv", que invierte el sentido.
 *
 * Cuando son de este modo, si llamamos "A" a las opciones antiguas, "N"
 * a las nuevas, !A (o !N) si las opciones se marcan con inv:true; "y"
 * la intersecciín y "o" la unión; las nuevas opciones estarán incluidas
 * en las antiguas si se cumple eesto en cada uno de los cuatro casos:
 *
 * 1.  N y  A = N
 * 2.  N y !A = Vacio
 * 3. !N y !A = !A
 * 4. !N o  A = Todos
 *
 * @param {Object} opts: Opciones, en principio, aplicadas.
 * @param {Object} newopts: Opciones que de desean comprobar.
 * @param {Array} all: Todos los valores posibles que puede contener
 *    el array.
 *
 * @returns {Boolean} Verdadero si las nuevas opciones están incluidas.
 */
export function compareOpts(opts, newopts, all) {
   const no = Object.assign({}, opts),
         np = Object.assign({}, newopts);

   delete no.inv;
   delete np.inv;

   const oprop = Object.getOwnPropertyNames(no),
         pprop = Object.getOwnPropertyNames(np);

   if(oprop.length !== pprop.length || oprop.length !== 1 || oprop[0] !== pprop[0]) {
         console.warn("Imposible comparar opciones. Se usa equals");
         return equals(opts. newopts);
   }

   const attr = oprop[0];  // Este es el atributo que contiene el array.

   if(!opts.inv && newopts.inv) {  //A, !N
      const union = [].concat(opts[attr]);
      for(const p of newopts[attr]) {
         if(opts[attr].indexOf(p) === -1) union.push(p);
      }
      return union.length === all.length;
   }
   else {
      const inters = opts[attr].filter(e => newopts[attr].indexOf(e) !== -1);

      if(newopts.inv) return inters.length === opts[attr].length;  //!N, !A
      else {
         if(opts.inv) return inters.length === 0;  // !A, N
         else return inters.length === newopts[attr].length; // N, A
      }
   }

}
