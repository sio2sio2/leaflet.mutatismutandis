import {getProperty} from "./misc.js";

// Issue #21

/**
 * Calcula la intersección entre dos *arrays*.
 * @function
 *
 * @param {Array} a1  Un ``Array``.
 * @param {Array} a2 El otro ``Array``.
 *
 * @return {Array}  Un array con los elementos que se encuentra en ambos *arrays*.
 */
const intersection = (a1, a2) => a1.filter(e => a2.indexOf(e) !== -1);

/**
 * Obtiene los nombres de las propiedades de un objeto,
 * así como los nombres de las propiedades anidadas.
 *
 * Sólo se extraen propiedades de objetos cuyo constructor
 * sea directamente ``Object``; y, opcionalmente, los índices
 * de los arrays.
 *
 * @param {Object}  o     El objeto a inspeccionar.
 * @param {Number}  depth Profundidad hasta la que se desea inspeccionar.
 *                         Para no definir ninguna, use ``null``.
 * @param {Boolean} arr   ``true``, si se desea inspeccionar las propiedades
 *                        que son ``arrays``.
 * @param {String}  attr  Nombre parcial de la propiedad. En principio,
 *                        sólo debería usarse este parámetro en las llamadas
 *                        recursivas que se hacen dentro de la propia función.
 *
 * @example
 *
 * o = {a: 1, arr: [2, 3], b: {c: 4}}
 * getNestedKeys(o)  // ["a", "arr", "b", "b.c"]
 * getNestedKeys(o, true)  // ["a", "arr", "arr.0", "arr.1", ,"b", "b.c"]
 *
 */
function getNestedKeys(o, depth, arr, attr) {
   let res = [],
       attrs;
   if(depth === undefined) depth = null;
   if(attr) res.push(attr);
   if(o === null || typeof o !== "object" || depth !== null && depth < 1) return res;
   if(o.constructor === Array) {
      if(arr) attrs = o.keys();
      else return res;
   }
   else attrs = Object.keys(o);
   if(depth !== null) depth--;
   for(const p of attrs) res.push.apply(res, getNestedKeys(o[p], depth, arr, attr?attr + "." + p:p));
   return res;
}


/**
 * Cuenta el número de veces que aparece un carácter en una cadena.
 *
 * @param {String}  La cadena donde se realiza la busqueda
 * @param {String}  El carácter que se desea contar (carácter, no subcadena).
 *
 * @returns {Number} El número de ocurrencias.
 */
function countChar(string, ch) {
   let res = 0;
   for(const c of string) if(c===ch) res++;
   return res;
}


/**
 * Construye conversores entre objetos de distinto tipo.
 *
 * @class
 * @param {Array.<String>} params Enumera las nombres de las propiedades que tiene
 * el objeto de destino.
 *
 * @classdesc Permite definir cómo un objeto se obtiene
 * a partir de las propiedades de otro.
 *
 * @example
 *
 *    const converter = L.utils.Converter(["numadj", "tipo"])
 *                             .define("numadj", "adj", a => a.total)
 *                             .define("tipo");
 */
function Converter(params) {
   /**
    * Almacena los nombres de cada propiedad del objeto resultante,
    * de qué propiedades del objeto de partida dependen y cuál es
    * la función conversora entre estas últimas y la primera.
    * @type {Array}
    * @private
    */
   this._params = {}
   for(const p of params) this._params[p] = {
      enabled: true,
      depends: [],
      converter: null
   }
   /**
    * Guarda la profundidad máxima a la que se encuentran las propiedades
    * del objeto de partida que influyen en las propiedades del objeto
    * resultado. Su valor calculándolo a partir de las dependencias que
    * se van declarando para cada propiedad al usar :meth:`L.utils.Converter#define`
    * @name L.utils.Converter#__depth
    * @private
    * @type {Number}
    *
    */
   Object.defineProperty(this, "__depth", {
      value: 1,
      writable: true,
      configurable: false,
      enumerable: false
   });
}


Object.defineProperties(Converter.prototype, {
   /**
    * Deshabilita una propiedad del objeto resultante. Esto significa
    * que cuando se obre la conversión del objeto, nunca se intentará
    * obtener el valor de esta propiedad.
    * @method L.utils.Converter#disable
    *
    * @param {string} param  Nombre de la propiedad.
    *
    * @returns {L.utils.Converter} El propio objeto.
    */
   "disable": {
      value: function(param) {
         this._params[param].enabled = false;
         return this;
      },
      writable: false,
      configurable: false
   },
   /**
    * Habilita una propiedad del objeto resultante.
    * @method L.utils.Converter#enable
    *
    * @param {string} param  Nombre de la propiedad.
    *
    * @returns {L.utils.Converter} El propio objeto.
    */
   "enable": {
      value: function(param) {
         this._params[param].enabled = true;
         return this;
      },
      writable: false,
      configurable: false
   },
   /**
    * Las propiedades definidas para el objeto resultante.
    * @name L.utils.Converter#params
    * @type Array.<String>
    */
   "params": {
      get: function() {
         return Object.keys(this._params);
      },
      configurable: false
   },
   /**
    * Las propiedades habilitadas para el objeto resultante.
    * @name L.utils.Converter#enabled
    * @type Array.<String>
    */
   "enabled": {
      get: function() {
         return this.params.filter(p => this._params[p].enabled);
      },
      configurable: false
   },
   /**
    * Informa de si todas las propiedades habilitadas tienen definida una conversión
    * @name L.utils.Converter#defined
    * @tyoe {Boolean}
    */
   "defined": {
      get: function() {
         return this.params.every(p => !this._params[p].enabled || this.isDefined(p));
      },
      configurable: false
   },
   /**
    * Define cómo obtener una propiedad del objeto resultante.
    * @method L.utils.Converter#define
    *
    * @param {String} param     El nombre de la propiedad.
    * @param {(Array.<String>|String)} properties Los nombres de las propiedades del objeto
    *       original que contribuyen a formar el valor de la propiedad del objeto
    *       resultante. Si la propiedad es una sola, puede evitarse el uso del
    *       *array* y escribir directamente el nombre. Si se omite este argumento,
    *       se sobreentiende que el nombre de la propiedad en el objeto original
    *       y el resultante es el mismo.
    * @param {Function} func    La función conversora. Debe definirse de modo
    *       que reciba como argumentos los valores de las
    *       propiedades que se enumeran en ``properties``, conservando el orden.
    *
    * @returns {?L.utils.Converter} El propio objeto de conversión o null, si
    *       la propiedad que se intenta definir, no se registró al crear
    *       el objeto.
    */
   "define": {
      value: function(param, properties, func) {
         if(!(properties instanceof Array)) properties = [properties || param];
         if(!this._params.hasOwnProperty(param)) {
            console.warn(`Opción ${param} inexistente. No se hace ninguna definición`);
            return null;
         }
         this._params[param].depends = properties;
         this._params[param].converter = func || (x => x);
         const depth = Math.max(properties.map(p => countChar(p, ".") + 1));
         if(depth > this.__depth) this.__depth = depth;
         return this;
      },
      writable: false,
      configurable: false
   },
   /**
    * Informa de si la propiedad tiene definida la conversión.
    * @method L.utils.Converter#isDefined
    *
    * @param {String} param  El nombre de la propiedad.
    *
    * @returns {Boolean}
    */
   "isDefined": {
      value: function(param) {
         return this._params[param].converter !== null;
      },
      writable: false,
      configurable: false
   },
   /**
    * Lleva a cabo la conversión del objeto suministrado. Sólo se
    * obtienen las propiedades que estén habilitadas y para las que
    * se pueda realizar la conversión, porque exista toda la
    * información requerida en el objeto.
    * @method L.utils.Converter#run
    *
    * @param {Object} o El objeto original
    *
    * @returns {Object} El objeto resultante.
    */
   "run": {
      value: function(o) {
         const res = {};
         for(const p of this._getParams(getNestedKeys(o, this.__depth))) {
            if(!this.isDefined(p)) throw new Error(`${p}: su conversión no está definida`);
            const converter = this._params[p].converter,
                  depends = this._params[p].depends;
            res[p] = converter.apply(null, depends.map(d => getProperty(o, d)));
         }
         return res;
      },
      writable: false,
      configurable: false
   },
   /**
    * Devuelve las propiedades habilitadas cuyas dependecias
    * se encuentran por completo en la lista de propiedades
    * que se suministra.
    * @method L.utils.Converter#_getParams 
    * @private
    *
    * @param {Array.<String>} properties Lista con nombres de propiedades
    *
    * @returns {Boolean}
    */
   "_getParams": {
      value: function(properties) {
         return this.params.filter(p => this._params[p].enabled
                                     && this._params[p].depends.length == intersection(this._params[p].depends, properties).length);
      },
      writable: false,
      configurable: false
   }
});

export default Converter;
