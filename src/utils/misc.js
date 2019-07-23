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

   for(let i=0; i<oprop.length; i++) {
      const name = oprop[i];
      if(!equals(o[name], p[name])) return false;
   }
   return true;
}
