(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("leaflet"));
	else if(typeof define === 'function' && define.amd)
		define(["leaflet"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("leaflet")) : factory(root["L"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__30__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var getOwnPropertyDescriptor = __webpack_require__(40).f;
var hide = __webpack_require__(10);
var redefine = __webpack_require__(11);
var setGlobal = __webpack_require__(56);
var copyConstructorProperties = __webpack_require__(74);
var isForced = __webpack_require__(61);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(127);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__(128);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-names.js
var es_object_get_own_property_names = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(95);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.ends-with.js
var es_string_ends_with = __webpack_require__(130);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(98);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(19);

// CONCATENATED MODULE: ./src/utils/misc.js

















function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
function load(params) {
  var xhr = new XMLHttpRequest();
  var qs = '',
      method = (params.method || (params.params ? "POST" : "GET")).toUpperCase(),
      contentType = params.contentType || "application/x-www-form-urlencoded";

  if (params.params) {
    if (method === "GET" || params.contentType === "application/x-www-form-urlencoded") {
      qs = Object.keys(params.params).map(function (k) {
        return k + "=" + encodeURIComponent(params.params[k]);
      }).join('&');
    } else if (params.contentType.indexOf("application/json") !== -1) {
      qs = JSON.stringify(params.params);
    } else throw new Error("".concat(params.contentType, ": Tipo de contenido no soportando"));

    if (method === "GET") {
      params.url = params.url + "?" + qs;
      qs = "";
    }
  }

  xhr.open(method, params.url, !!params.callback);

  for (var header in params.headers || {}) {
    xhr.setRequestHeader(header, params.headers[header]);
  }

  if (method === "POST") xhr.setRequestHeader("Content-Type", params.contentType);

  if (params.callback || params.failback) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (params.callback) {
            if (params.context) params.callback.call(params.context, xhr);else params.callback(xhr);
          }
        } else if (params.failback) {
          if (params.context) params.failback.call(params.context, xhr);else params.failback(xhr);
        }
      }
    };

    if (params.url.endsWith(".html")) {
      // Permite para las respuestas HTML, obtener un responseXML
      xhr.responseType = "document";
    }
  }

  xhr.send(qs); // Sólo es útil cuando la petición es síncrona.

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

function getProperty(obj, name) {
  return obj.hasOwnProperty(name) ? obj[name] : name.split(".").reduce(function (o, k) {
    return o && o.hasOwnProperty(k) ? o[k] : undefined;
  }, obj);
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

function equals(o, p) {
  if (_typeof(o) !== _typeof(p)) return false;
  if (_typeof(o) !== "object" || o === null) return o == p; // Comparación laxa.

  var oprop = Object.getOwnPropertyNames(o);
  var pprop = Object.getOwnPropertyNames(p);
  if (oprop.length !== pprop.length) return false;

  for (var i = 0; i < oprop.length; i++) {
    var name = oprop[i];
    if (!equals(o[name], p[name])) return false;
  }

  return true;
}
// EXTERNAL MODULE: ./src/utils/icons.js
var icons = __webpack_require__(53);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.every.js
var es_array_every = __webpack_require__(138);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-properties.js
var es_object_define_properties = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-property.js
var es_object_define_property = __webpack_require__(29);

// CONCATENATED MODULE: ./src/utils/converter.js















function converter_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { converter_typeof = function _typeof(obj) { return typeof obj; }; } else { converter_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return converter_typeof(obj); }

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

var intersection = function intersection(a1, a2) {
  return a1.filter(function (e) {
    return a2.indexOf(e) !== -1;
  });
};
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
  var res = [],
      attrs;
  if (depth === undefined) depth = null;
  if (attr) res.push(attr);
  if (o === null || converter_typeof(o) !== "object" || depth !== null && depth < 1) return res;

  if (o.constructor === Array) {
    if (arr) attrs = o.keys();else return res;
  } else attrs = Object.keys(o);

  if (depth !== null) depth--;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = attrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var p = _step.value;
      res.push.apply(res, getNestedKeys(o[p], depth, arr, attr ? attr + "." + p : p));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

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
  var res = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = string[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var c = _step2.value;
      if (c === ch) res++;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

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
  this._params = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = params[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var p = _step3.value;
      this._params[p] = {
        enabled: true,
        depends: [],
        converter: null
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

      };
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

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
    value: function value(param) {
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
    value: function value(param) {
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
    get: function get() {
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
    get: function get() {
      var _this = this;

      return this.params.filter(function (p) {
        return _this._params[p].enabled;
      });
    },
    configurable: false
  },

  /**
   * Informa de si todas las propiedades habilitadas tienen definida una conversión
   * @name L.utils.Converter#defined
   * @tyoe {Boolean}
   */
  "defined": {
    get: function get() {
      var _this2 = this;

      return this.params.every(function (p) {
        return !_this2._params[p].enabled || _this2.isDefined(p);
      });
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
    value: function value(param, properties, func) {
      if (!(properties instanceof Array)) properties = [properties || param];

      if (!this._params.hasOwnProperty(param)) {
        console.warn("Opci\xF3n ".concat(param, " inexistente. No se hace ninguna definici\xF3n"));
        return null;
      }

      this._params[param].depends = properties;

      this._params[param].converter = func || function (x) {
        return x;
      };

      var depth = Math.max(properties.map(function (p) {
        return countChar(p, ".") + 1;
      }));
      if (depth > this.__depth) this.__depth = depth;
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
    value: function value(param) {
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
    value: function value(o) {
      var res = {};
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this._getParams(getNestedKeys(o, this.__depth))[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var p = _step4.value;
          if (!this.isDefined(p)) throw new Error("".concat(p, ": su conversi\xF3n no est\xE1 definida"));
          var converter = this._params[p].converter,
              depends = this._params[p].depends;
          res[p] = converter.apply(null, depends.map(function (d) {
            return getProperty(o, d);
          }));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
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
    value: function value(properties) {
      var _this3 = this;

      return this.params.filter(function (p) {
        return _this3._params[p].enabled && _this3._params[p].depends.length == intersection(_this3._params[p].depends, properties).length;
      });
    },
    writable: false,
    configurable: false
  }
});
/* harmony default export */ var utils_converter = (Converter);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__(99);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.seal.js
var es_object_seal = __webpack_require__(139);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__(140);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(106);

// CONCATENATED MODULE: ./src/utils/options.js












/**
 * Construye el objeto modificable. Una vez construido, pueden modificarse los
 * valores de los atributos; pero no añadir nuevos o eliminar alguno de los
 * existentes.
 * @name Options
 * @class
 *
 * @param {Object} Objeto que contiene las propiedades y sus valores iniciales.
 *
 * @classdesc Clase que permite saber si el objeto ha cambiado algunos de
 * sus propiedades desde la última vez que se reseteó (con el método 
 * :meth:`Options#reset`).
 *
 * @example
 *
 * const o = new Options({a: 1, b: 2, c: 3});
 * o.updated  // false, ya que se fijaron valores nuevos.
 * o.a = 0    // Fijamos un valor para a
 * o.d = 7    // No tiene efecto. Con strict provocará un error.
 * o.modified // {a: 1}. Sólo devuelve los valores actualizados.
 * o.reset()
 * o.updated  // true. Resetear marca el objeto como actualizado.
 *
 */

/**
 * Nombres prohibidos para las propiedades
 * @private
 * @type {Array.<String>}
 */
var banned = ["updated"];

function Options(opts) {
  Object.defineProperty(this, "_updated", {
    value: new Set(Object.keys(opts)),
    writable: true,
    enumerable: false,
    configurable: false
  });

  for (var attr in opts) {
    if (banned.indexOf(attr) !== -1) throw new Error(attr + ": opción prohibida");
    defineOption.call(this, attr);
    if (opts[attr] !== undefined) this[attr] = opts[attr];
  }

  Object.seal(this);
}
/**
 * Setter para las propiedades. Básicamente se encarga
 * de fijar el valor y apuntar en la propiedad como actualizada.
 * @memberof Options
 * @private
 *
 * @param {String} attr Nombre de la propiedad.
 * @param {*} value  Valor de la propiedad.
 */


function setter(attr, value) {
  if (this["_" + attr] === value) return;
  this["_" + attr] = value;

  this._updated.add(attr);
}

function getter(attr) {
  return this["_" + attr];
} // Define la propiedad que representa una opción.


function defineOption(name) {
  var _this = this;

  Object.defineProperty(this, "_" + name, {
    value: undefined,
    writable: true,
    configurable: false,
    enumerable: false
  });
  Object.defineProperty(this, name, {
    get: function get() {
      return getter.call(_this, name);
    },
    set: function set(value) {
      return setter.call(_this, name, value);
    },
    configurable: false,
    enumerable: true
  });
}
/**
 * Cambia varios valores a la vez.
 * @method Options#change
 *
 * @param {Obj} obj  Objeto que contien los nombres y los nuevos valores
 *    de las propiedades.
 */


Object.defineProperty(Options.prototype, "change", {
  value: function value(obj) {
    for (var name in obj) {
      if (Object.keys(this).indexOf(name) === -1) continue;
      this[name] = obj[name];
    }
  },
  writable: false,
  configurable: false,
  enumerable: false
});
/**
 * Informa de si se han modificado las opciones. Cuando una opción cambia,
 * se modifica automáticamente el valor de esta propiedad a verdadera.
 * @name Options#updated
 * @type {Boolean}
 */

Object.defineProperty(Options.prototype, "updated", {
  get: function get() {
    return this._updated.size === 0;
  },
  enumerable: false,
  configurable: false
});
/**
 * Marca las opciones como actualizadas.
 * @method Options#reset
 */

Object.defineProperty(Options.prototype, "reset", {
  value: function value() {
    this._updated.clear();
  },
  writable: false,
  enumerable: false,
  configurable: false
});
/**
 * Devuelve sólo las opciones modificadas
 * @name Options#modified
 * @type {Array.<String>}
 */

Object.defineProperty(Options.prototype, "modified", {
  get: function get() {
    var _this2 = this;

    var res = {};

    this._updated.forEach(function (e) {
      return res[e] = _this2[e];
    });

    return res;
  },
  enumerable: false,
  configurable: false
});
/* harmony default export */ var options = (Options);
// CONCATENATED MODULE: ./src/utils/index.js
/* concated harmony reexport load */__webpack_require__.d(__webpack_exports__, "g", function() { return load; });
/* concated harmony reexport getProperty */__webpack_require__.d(__webpack_exports__, "e", function() { return getProperty; });
/* concated harmony reexport equals */__webpack_require__.d(__webpack_exports__, "d", function() { return equals; });
/* concated harmony reexport createMutableIconClass */__webpack_require__.d(__webpack_exports__, "c", function() { return icons["a" /* createMutableIconClass */]; });
/* concated harmony reexport grayFilter */__webpack_require__.d(__webpack_exports__, "f", function() { return icons["b" /* grayFilter */]; });
/* concated harmony reexport noFilteredIconCluster */__webpack_require__.d(__webpack_exports__, "h", function() { return icons["c" /* noFilteredIconCluster */]; });
/* concated harmony reexport Converter */__webpack_require__.d(__webpack_exports__, "a", function() { return utils_converter; });
/* concated harmony reexport Options */__webpack_require__.d(__webpack_exports__, "b", function() { return options; });






/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var shared = __webpack_require__(34);
var uid = __webpack_require__(43);
var NATIVE_SYMBOL = __webpack_require__(78);

var Symbol = global.Symbol;
var store = shared('wks');

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof global == O && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(112)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(71);
var anObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(33);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var definePropertyModule = __webpack_require__(7);
var createPropertyDescriptor = __webpack_require__(31);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var shared = __webpack_require__(34);
var hide = __webpack_require__(10);
var has = __webpack_require__(8);
var setGlobal = __webpack_require__(56);
var nativeFunctionToString = __webpack_require__(73);
var InternalStateModule = __webpack_require__(35);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

shared('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(27);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(32);
var requireObjectCoercible = __webpack_require__(27);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(14);
var addToUnscopables = __webpack_require__(116);
var Iterators = __webpack_require__(39);
var InternalStateModule = __webpack_require__(35);
var defineIterator = __webpack_require__(63);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(2);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(11);
var toString = __webpack_require__(126);

var ObjectPrototype = Object.prototype;

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (toString !== ObjectPrototype.toString) {
  redefine(ObjectPrototype, 'toString', toString, { unsafe: true });
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(92).charAt;
var InternalStateModule = __webpack_require__(35);
var defineIterator = __webpack_require__(63);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var DOMIterables = __webpack_require__(93);
var ArrayIteratorMethods = __webpack_require__(15);
var hide = __webpack_require__(10);
var wellKnownSymbol = __webpack_require__(3);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      hide(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) hide(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        hide(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var global = __webpack_require__(4);
var IS_PURE = __webpack_require__(41);
var DESCRIPTORS = __webpack_require__(5);
var NATIVE_SYMBOL = __webpack_require__(78);
var fails = __webpack_require__(2);
var has = __webpack_require__(8);
var isArray = __webpack_require__(62);
var isObject = __webpack_require__(6);
var anObject = __webpack_require__(9);
var toObject = __webpack_require__(13);
var toIndexedObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(33);
var createPropertyDescriptor = __webpack_require__(31);
var nativeObjectCreate = __webpack_require__(38);
var objectKeys = __webpack_require__(45);
var getOwnPropertyNamesModule = __webpack_require__(44);
var getOwnPropertyNamesExternal = __webpack_require__(80);
var getOwnPropertySymbolsModule = __webpack_require__(60);
var getOwnPropertyDescriptorModule = __webpack_require__(40);
var definePropertyModule = __webpack_require__(7);
var propertyIsEnumerableModule = __webpack_require__(55);
var hide = __webpack_require__(10);
var redefine = __webpack_require__(11);
var shared = __webpack_require__(34);
var sharedKey = __webpack_require__(42);
var hiddenKeys = __webpack_require__(36);
var uid = __webpack_require__(43);
var wellKnownSymbol = __webpack_require__(3);
var wrappedWellKnownSymbolModule = __webpack_require__(81);
var defineWellKnownSymbol = __webpack_require__(82);
var setToStringTag = __webpack_require__(46);
var InternalStateModule = __webpack_require__(35);
var $forEach = __webpack_require__(28).forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var JSON = global.JSON;
var nativeJSONStringify = JSON && JSON.stringify;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = NATIVE_SYMBOL && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
JSON && $({ target: 'JSON', stat: true, forced: !NATIVE_SYMBOL || fails(function () {
  var symbol = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  return nativeJSONStringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || nativeJSONStringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || nativeJSONStringify(Object(symbol)) != '{}';
}) }, {
  stringify: function stringify(it) {
    var args = [it];
    var index = 1;
    var replacer, $replacer;
    while (arguments.length > index) args.push(arguments[index++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return nativeJSONStringify.apply(JSON, args);
  }
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(0);
var DESCRIPTORS = __webpack_require__(5);
var global = __webpack_require__(4);
var has = __webpack_require__(8);
var isObject = __webpack_require__(6);
var defineProperty = __webpack_require__(7).f;
var copyConstructorProperties = __webpack_require__(74);

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(82);

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $filter = __webpack_require__(28).filter;
var arrayMethodHasSpeciesSupport = __webpack_require__(49);

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('filter') }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $indexOf = __webpack_require__(77).indexOf;
var sloppyArrayMethod = __webpack_require__(16);

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var toObject = __webpack_require__(13);
var nativeKeys = __webpack_require__(45);
var fails = __webpack_require__(2);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(47);
var IndexedObject = __webpack_require__(32);
var toObject = __webpack_require__(13);
var toLength = __webpack_require__(12);
var arraySpeciesCreate = __webpack_require__(83);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var DESCRIPTORS = __webpack_require__(5);
var objectDefinePropertyModile = __webpack_require__(7);

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__30__;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);
var classof = __webpack_require__(26);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var setGlobal = __webpack_require__(56);
var IS_PURE = __webpack_require__(41);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.2.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(113);
var global = __webpack_require__(4);
var isObject = __webpack_require__(6);
var hide = __webpack_require__(10);
var objectHas = __webpack_require__(8);
var sharedKey = __webpack_require__(42);
var hiddenKeys = __webpack_require__(36);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var defineProperties = __webpack_require__(79);
var enumBugKeys = __webpack_require__(59);
var hiddenKeys = __webpack_require__(36);
var html = __webpack_require__(115);
var documentCreateElement = __webpack_require__(72);
var sharedKey = __webpack_require__(42);
var IE_PROTO = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var propertyIsEnumerableModule = __webpack_require__(55);
var createPropertyDescriptor = __webpack_require__(31);
var toIndexedObject = __webpack_require__(14);
var toPrimitive = __webpack_require__(33);
var has = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(71);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34);
var uid = __webpack_require__(43);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(76);
var enumBugKeys = __webpack_require__(59);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(76);
var enumBugKeys = __webpack_require__(59);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(7).f;
var has = __webpack_require__(8);
var wellKnownSymbol = __webpack_require__(3);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(48);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);
var wellKnownSymbol = __webpack_require__(3);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  return !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var assign = __webpack_require__(125);

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $map = __webpack_require__(28).map;
var arrayMethodHasSpeciesSupport = __webpack_require__(49);

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('map') }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(96);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(L) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return grayFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return noFilteredIconCluster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createMutableIconClass; });
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mutableIcon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);

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

function grayFilter(filtered) {
  if (filtered) this.style.filter = "grayscale(100%)";else this.style.removeProperty("filter");
}
/**
 * Redefine ``iconCreateFunction`` basándose en la definición original de
 * `L.MarkerClusterGroup <https://github.com/Leaflet/Leaflet.markercluster>`_
 * para que el número del clúster sólo cuente los centros no filtrados.
 *
 * @param {L.MarkerCluster} cluster El cluster sobre el que se aplica la función.
 */

function noFilteredIconCluster(cluster) {
  var childCount = cluster.getChildCount(),
      noFilteredChildCount = cluster.getAllChildMarkers().filter(function (e) {
    return !e.filtered;
  }).length;
  var c = ' marker-cluster-';

  if (childCount < 10) {
    c += 'small';
  } else if (childCount < 100) {
    c += 'medium';
  } else {
    c += 'large';
  }

  return new L.DivIcon({
    html: '<div><span>' + noFilteredChildCount + '</span></div>',
    className: 'marker-cluster' + c,
    iconSize: new L.Point(40, 40)
  });
} // Fin issue #5
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

function createMutableIconClass(name, options) {
  var mutable = options.updater && options.converter;

  if (options.css) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = options.css;
    link.id = "leafext-css-" + name;
    document.querySelector("head").appendChild(link);
    delete options.css;
  }

  options.className = options.className || name; // Además de devolver el icono, lo precargamos en caso
  // de que hubiera que ir a buscarlo en un fichero externo

  if (mutable) return _mutableIcon_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].extend({
    options: options
  }).onready(function () {
    return true;
  });else {
    console.warn("Falta updater o converter: el icono no será mutable");
    return L.DivIcon.extend({
      options: options
    });
  }
} // Fin issue #2
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(30)))

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(99);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(101);
/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(106);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(19);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1);












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
  if (typeof e === "string" || e instanceof String) {
    var div = document.createElement("div");
    div.innerHTML = e;
    e = document.createDocumentFragment();
    Array.from(div.children).forEach(function (node) {
      return e.appendChild(node);
    });
  }

  if (e instanceof Document || e instanceof DocumentFragment) {
    if (e.children.length === 1) {
      e = e.firstElementChild.cloneNode(true);
      e.container = false;
    } else {
      var container = document.createElement("div");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = e.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var x = _step.value;
          container.appendChild(x.cloneNode(true));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      e = container;
      e.container = true;
    }
  } else if (e instanceof HTMLElement) {
    e = e.cloneNode(true);
    e.container = false;
  } else throw new TypeError("Tipo de elemento no soportado");

  return e;
}
/**
 * @name L.Icon.Mutable
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
 * const Icon = L.Icon.Mutable.extend({
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


/* harmony default export */ __webpack_exports__["a"] = (L.DivIcon.extend({
  /** @lends L.Icon.Mutable.prototype */
  // Issue #2
  statics: {
    /** @lends L.Icon.Mutable */

    /**
     * Informa si la clase de icono se encuentra lista para utilizarse.
     * @type {Boolean}
     */
    isready: function isready() {
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
    onready: function onready(func_success, func_fail) {
      var _this = this;

      if (!this.isready()) {
        if (this._onprocess) {
          // Ya está pedido el fichero, así que esperamos.
          var id = setInterval(function () {
            if (_this.isready()) {
              clearInterval(id);
              delete _this._onprocess;
              func_success();
            }
          }, 20);
        } else {
          this._onprocess = true;
          Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_11__[/* load */ "g"])({
            url: this.prototype.options.url,
            callback: function callback(xhr) {
              _this.prototype.options.html = getElement(xhr.responseXML);
              delete _this._onprocess;
              func_success();
            },
            failback: function failback(xhr) {
              delete _this._onprocess;
              func_fail(xhr.statusText);
            }
          });
        }
      } else func_success();

      return this;
    },
    // Para comprobar que se incluyeron updater y converter
    extend: function extend(obj) {
      var MutableIcon = L.Icon.extend.call(this, obj);
      var options = MutableIcon.prototype.options;

      if (options.updater && options.converter) {
        if (options.html) options.html = getElement(options.html);else if (!options.url) throw new Error("Falta definir las opciones html o url");
      } else throw new Error("Un icono mutable requiere funciones updater y converter");

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
  createIcon: function createIcon() {
    this.options.params = this.options.params || new _utils_index_js__WEBPACK_IMPORTED_MODULE_11__[/* Options */ "b"](this.options.converter.run(this._marker.getData())); // Las opciones de dibujo cambiaron mientras el icono no estaba presente en el mapa.

    if (!this.options.params.updated) {
      delete this.options.html;

      this._marker.fire("iconchange", {
        reason: "draw",
        opts: this.options.params._updated
      }); // Issue #86

    }

    if (!this.options.hasOwnProperty("html")) {
      var html = this.options.html.cloneNode(true);
      html.container = this.options.html.container;
      this.options.updater.call(html, this.options.params);
      if (html.container !== undefined) this.options.html = html.container ? html.innerHTML : html.outerHTML;
      this.options.params.reset();
    }

    var div = L.DivIcon.prototype.createIcon.call(this, arguments); // Issue #5

    var filter = this._marker.options.filter;

    if (filter && this._marker.filtered && !filter.hideable) {
      filter.transform.call(div, true);
    } // Fin issue #5


    return div;
  },

  /**
   * Refresca el icono, en caso de que hayan cambiado las opciones de dibujo.
   * El método modifica directamente el HTML sobre el documento.
   * @memberof Icon.prototype
   *
   * @return {Boolean} ``true`` si se redibujó realmente el icono.
   */
  refresh: function refresh() {
    if (!this.options.params || this.options.params.updated) return false;
    this.options.updater.call(this._marker.getElement(), this.options.params.modified);

    this._marker.fire("iconchange", {
      reason: "redraw",
      opts: this.options.params._updated
    }); // Issue #86


    this.options.params.reset(); // Si se cambia el icono dibujado, el options.html guardado ya no vale.

    delete this.options.html;
    return true;
  }
}));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(30)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var hide = __webpack_require__(10);

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(75);
var global = __webpack_require__(4);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 60 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(26);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var createIteratorConstructor = __webpack_require__(117);
var getPrototypeOf = __webpack_require__(64);
var setPrototypeOf = __webpack_require__(86);
var setToStringTag = __webpack_require__(46);
var hide = __webpack_require__(10);
var redefine = __webpack_require__(11);
var wellKnownSymbol = __webpack_require__(3);
var IS_PURE = __webpack_require__(41);
var Iterators = __webpack_require__(39);
var IteratorsCore = __webpack_require__(84);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toObject = __webpack_require__(13);
var sharedKey = __webpack_require__(42);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(85);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(33);
var definePropertyModule = __webpack_require__(7);
var createPropertyDescriptor = __webpack_require__(31);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var DESCRIPTORS = __webpack_require__(5);
var defineProperties = __webpack_require__(79);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var hiddenKeys = __webpack_require__(36);
var isObject = __webpack_require__(6);
var has = __webpack_require__(8);
var defineProperty = __webpack_require__(7).f;
var uid = __webpack_require__(43);
var FREEZING = __webpack_require__(107);

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(119);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(120);
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(87);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(88);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(121);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(122);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(50);
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(90);
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(25);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(18);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(19);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(1);
/* harmony import */ var _corrsys_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(70);
/* harmony import */ var _filtersys_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(69);




















function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // Issue #67

/**
 * Devuelve un array con todas las correcciones aplicadas de modo que
 * cada elemento es un objeto que contiene el nombre de la corrección,
 * las opciones con las que se aplicó y si se hizo manual o automáticamente.
 *
 * @param {String} name  Nombre de una corrección aplicada manualmente. Si
 * se proporciona se devuelve esta misma corrección y todas las que desencadenó
 * automáticamente. Si no se proprociona, se devielven todas las correcciones
 * manuales y automáticas.
 */

function getCorrs(name) {
  var corr = this.prototype.options.corr;
  if (name) name = [name];else name = Object.keys(corr.getAppliedCorrections());
  var ret = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = name[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var n = _step.value;
      var opts = corr.getAutoCorrs(n),
          auto2 = corr.getOptions(n).auto;

      for (var x in opts) {
        ret.push({
          name: x,
          opts: opts[x],
          auto: x === n ? false : auto2
        });
      }
    } // Ordenamos por nombre de corrección y para una misma
    // corrección, colocamos primero la manual.

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret.sort(function (a, b) {
    return -1 * (b.name + Number(b.auto) > a.name + Number(a.auto));
  });
} // Fin issue #67

/**
 * Opciones para :js:class:`MutableMarker`. A las generales que permite `L.Marker
 * <https://leafletjs.com/reference-1.4.0.html#marker>`_ de Leaflet
 * añade algunas más
 * @name Marker.prototype.options
 * @type {Marker.Options}
 */

/**
 * Optiones adicionales de la clase :js:class:`Marker`.
 * @typedef {Object} Marker~Options
 * @property {String} opts.mutable  Nombre de la propiedad a la que se conectan los datos de
 * las marcas. Si es una propiedad anidada puede usarse la notación de punto.
 * Por ejemplo, ``feature.properties``.
 * @property {(L.LayerGroup|String|Function)} opts.filter Habilita un :class:`sistema de filtros
 * <CorrSys>` para la clase de marca. Puede adoptar tres valores distintos:
 *    
 * * La capa a la que se agregan las marcas de esta clase. En este caso, el efecto
 *   del filtro será eliminar del mapa las marcas filtradas.
 * * Un nombre que se tomara como el nombre de la clase CSS a la que se quiere que
 *   pertenezcan las marcas filtradas.
 * * Una función de transformación que se aplicará al elemento HTML que
 *   representa en el mapa cada marca filtrada. El contexto de esta función será el propio
 *   elemento HTML.
 */

/**
 * @name L.MutableMarker
 * @extends L.Marker
 * @classdesc  Extiende la clase `L.Marker <https://leafletjs.com/reference-1.4.0.html#marker>`_
 * a fin de permitir que los iconos sean variables y mutables a partir de los datos definidos.
 * Consulte cuáles son las :attr:`Marker#options` opciones que lo habiliten}.
 * @class
 * @hideconstructor
 *
 * @example
 *
 * const Marker = L.MutableMarker.extend({
 *    options: {
 *       mutable: "feature.properties",
 *       filter: L.utils.grayFilter
 *    }
 * });
 *
 * const marca = new Marker([37.07,-5.98], {icon: new Icon()});
 */


/* harmony default export */ __webpack_exports__["a"] = (L.Marker.extend({
  /** @lends L.MutableMarker.prototype */
  statics: {
    /** @lends L.MutableMarker */
    extend: function extend() {
      var MutableMarker = L.Marker.extend.apply(this, arguments),
          options = MutableMarker.prototype.options;
      if (!options.mutable) throw new Error("La opción 'mutable' es obligatoria");
      Object.assign(MutableMarker, L.Evented.prototype); // Issue #54

      options.corr = new _corrsys_index_js__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"]();
      /**
       * Almacena todas las marcas creadas de este tipo
       * @type {Array.<L.MutableMarker>}
       */

      Object.defineProperty(MutableMarker, "store", {
        value: [],
        configurable: false,
        enumerable: false,
        writable: false
      }); // Issue #5

      if (options.filter) options.filter = new _filtersys_js__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"](options.filter);
      Object.defineProperty(MutableMarker.prototype, "filtered", {
        get: function get() {
          if (!this.options.filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");
          return this._filtered.length > 0;
        }
      }); // Fin issue #5

      return MutableMarker;
    },

    /**
     * Vacía :js:attr:`L.MutableMarker.store` de marcas y marca como desaplicadas las correcciones.
     * @param {Boolean} deep  Si ``true``, también desaplica los filtros.
     */
    reset: function reset(deep) {
      this.store.length = 0;
      var corrs = getCorrs.call(this); // Issue #67

      this.prototype.options.corr.reset(); // Issue #33
      // Issue #67

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = corrs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var c = _step2.value;
          this.fire("uncorrect:*", c);
          this.fire("uncorrect:".concat(c.name), c);
        } // Fin issue #67

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (deep) {
        var filters = this.getFilterStatus(); // Issue #67

        this.prototype.options.filter.reset(); // Issue #40
        // Issue #67

        for (var name in filters) {
          this.fire("unfilter:*", {
            name: name,
            opts: filters[name]
          });
          this.fire("unfilter:".concat(name), {
            name: name,
            opts: filters[name]
          });
        } // Fin issue #67

      }
    },

    /**
     * Elimina una marca del almacén donde se guardan
     * todos los objetos marca de una misma clase.
     *
     * @param {Marker} marker  La marca que se desea eliminar.
     * @returns {Boolean}  El éxito en la eliminación.
     */
    remove: function remove(marker) {
      var idx = this.store.indexOf(marker);
      if (idx === -1) return false;
      this.store.splice(idx, 1);
      return true;
    },

    /**
     * Ejecuta un método para todas las marcas almacenadas en store.
     * Si se proporciona una función progress, entonces la ejecución se interrumpe
     * cada 200ms, durante 50ms a fin de que no sienta el usuario bloqueda la interfaz.
     * Además esa función permite conocer dibujar el progreso (por ejemplo, mediante barra).
     *
     * @param {String} method  Nombre del métodoo
     * @param {Function} progress Función que dibuja el progreso de la opración. Recibe
     * 	como argumentos, el ordinal de la operación, el total de operaciones y el tiempo
     * 	que lkleva ejecutámndose el invoque.
     * @param {...*} param Parámetros que se pasan al método
     */
    invoke: function invoke(method, progress) {
      var _this = this;

      var args = Array.prototype.slice.call(arguments, 2);

      if (!progress) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.store[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var marker = _step3.value;
            this.prototype[method].apply(marker, args);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return;
      } // Issue #90


      var started = new Date().getTime(),
          total = this.store.length,
          noprogress = 1000,
          // Para menos de 1 segundo, no se muestra nada.
      check = 150,
          // Cada 150 marcas que comprueba si se hace la suspensión.
      interval = 200,
          // Tiempo de ejecución.
      delay = 50; // Tiempo de suspensión de la ejecución.

      var i = 0;

      var process = function process() {
        var start = new Date().getTime();

        for (; i < total; i++) {
          if ((i + 1) % check === 0) {
            var lapso = new Date().getTime() - start;
            if (lapso > interval) break;
          }

          _this.prototype[method].apply(_this.store[i], args);
        }

        if (progress !== true) {
          var lapsoTotal = new Date().getTime() - started;
          if (lapsoTotal > noprogress) progress(i, total, lapsoTotal);
        }

        if (i < total) setTimeout(process, delay);
      };

      process(); // Fin issue #90
    },

    /**
     * Registra una corrección en el sistema de correcciones de la marca.
     * @method Marker.register
     *
     * @param {String} name        Nombre que identifica a la corrección.
     * @param {Object} obj         Objeto que define la corrección
     * @param {String} obj.attr    Propiedad sobre el que opera la corrección.
     * Puede usarse la notación de punto para propiedades anidadas.
     * @param {Function} obj.func  Función que determina si se hace corrección o no.
     * Cuando la función corrige el array actúa eliminado valores y para
     * ello se ejecuta repetidamente sobre todos los elementos del *array*. Usa
     * como contexto la marca a la que pertenece el objeto
     * que contiene el *array*, y recibe tres parámetros: el primero es
     * el índice del elemento que se comprueba, el segundo el array mismo
     * y el tercero un objeto con las opciones aplicables de corrección.
     * Debe devolver ``true`` (el elemento debe eliminarse) o
     * ``false`` (no debe hacerlo). La función también puede añadir
     * nuevos elementos, en vez de eliminar los existentes. Vea la información
     * sobre el argumento *add* para saber más sobre ello.
     * @param {Boolean} obj.add    ``true`` si la corrección añade
     * elementos al array, y cualquier otro valor asimilable a ``false``
     * si su intención es eliminar elementos. Si los añade, la función deberá
     * devolver un *array* con los elementos a añadir y sólo se ejecuta una vez,
     * por lo que su primer argumento (que representa el índice del elemento) vale
     * ``null``.
     *
     * @example
     * Centro.register("adjpue", {
     *                   attr: "adj",
     *                   func: function(idx, adj, opts) {
     *                      return !!(opts.inv ^ (opts.puesto.indexOf(adj[idx].pue) !== -1));
     *                   },
     *                })
     *       .register("vt+", {
     *                   attr: "adj",
     *                   func: function(idx, adj, opts) {
     *                      const data = this.getData();
     *                      //Se deberían obtener las vacantes telefónicas de estos datos...
     *                      return ["Interino", "Interino"];
     *                   },
     *                   add: true
     *                });
     */
    register: function register() {
      return _corrsys_index_js__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"].prototype.register.apply(this.prototype.options.corr, arguments) && this;
    },
    // Issue #23

    /**
     * Aplica una corrección a las marcas de una clase.
     * @method Marker.correct
     *
     * @params {String} name   Nombre de la corrección.
     * @params {Object} params Opciones de aplicacion de la corrección.
     * @params {Boolean} auto  Si ``true``, aplica las correcciones
     * en cadena, si estas se han definino.
     *
     * @example
     * Centro.correct("adjpue", {puesto: ["11590107", "00590059"]})
     */
    correct: function correct(name, params, auto) {
      var corr = this.prototype.options.corr;

      try {
        // Si la correción ya está aplicada, sólo no se aplica en
        // caso de que se aplicara con las mismas opciones.
        if (Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_19__[/* equals */ "d"])(corr.getOptions(name).params, params)) return false;
      } catch (err) {
        // La corrección no está registrada.
        return false;
      }

      corr.initialize(name, params, auto);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.store[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var marker = _step4.value;
          marker.apply(name);
        } // Issue #54

      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var corrs = getCorrs.call(this, name);
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = corrs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var c = _step5.value;
          this.fire("correct:*", c);
          this.fire("correct:".concat(c.name), c);
        } // Fin issue #54

      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return this;
    },

    /**
     * Elimina una correccón de las marcas de una clase.
     * @method Marker.uncorrect
     *
     * @params {String} name   Nombre de la corrección.
     * @params {Array.<String>} prev  Si se encadenan correcciones, las
     * correcciones previas en la cadena. Este parámetro sólo debe usarlo
     * internamente la libreria.
     *
     * @example
     * marca.uncorrect("adjpue");
     */
    uncorrect: function uncorrect(name) {
      var corr = this.prototype.options.corr;

      try {
        // La corrección no está aplicada.
        if (!corr.getOptions(name).params) return false;
      } catch (err) {
        return false; // La corrección no está registrada.
      }

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.store[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var marker = _step6.value;
          marker.unapply(name);
        } // Issue #54

      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      var corrs = getCorrs.call(this, name);
      corr.setParams(name, null);
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = corrs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var c = _step7.value;
          this.fire("uncorrect:*", c);
          this.fire("uncorrect:".concat(c.name), c);
        } // Fin issue #54

      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return this;
    },
    // Fin issue #23
    // Issue #58

    /**
     * Comprueba si ya se ha aplicado una corrección con unas determinadas opciones
     * @param {String} name  El nombre de la corrección.
     * @param {Object} opts  Las nuevas opciones de aplicación.
     * @param {String} type  El tipo de comprobación que se quiere hacer: si "manual",
     * sólo se pretende comprobar si las opciones son equivalentes a la que se aplicaran
     * con anterioridad manualmente; si "auto", si la aplicación manual ya la incluyen
     * aplicaciones automáticas anteriores de la corrección. Cualquier otro valor prueba
     * con la manual y las automáticas.
     */
    appliedCorrection: function appliedCorrection(name, opts, type) {
      var corr = this.prototype.options.corr;
      return corr.isApplied(name, opts, type);
    },
    // Fin issue #58

    /**
     * Devuelve el estado actual de las correcciones aplicadas sobre las marcas
     * de un tipo.
     * @method Marker.getCorrectStatus
     *
     * @params {String} name   El nombre de una corrección.
     *
     * @returns {Object} Un objeto con dos objetos a su vez. El objeto *manual*, cuyas
     * claves son los nombres de las correcciones aplicadas manualmente y cuyos valores son
     * las opciones de corrección; y el objeto *auto* cuyas claves son los nombres de
     * las correcciones que se han aplicado automáticamente y cuyo valor es un objeto
     * en que las claves son los nombres de la correcciones que al aplicarse
     * manualmente la desencadenaron y cuyos valores son las opciones de aplicación
     * de la corrección automática.
     */
    getCorrectStatus: function getCorrectStatus(name) {
      var corr = this.prototype.options.corr,
          ret = {
        manual: {},
        auto: {}
      };
      var corrs = corr.getAppliedCorrections();

      for (var _name in corrs) {
        ret.manual[_name] = corrs[_name];
      }

      for (var _name2 in corr.getCorrections()) {
        var auto = corr.getAutoParams(_name2);
        if (Object.keys(auto).length > 0) ret.auto[_name2] = auto;
      }

      return ret;
    },
    // Issue #5

    /**
     * Registra para una clase de marcas un filtro.
     * @method Marker.registerF
     *
     * @param {String}         name  Nombre del filtro.
     * @param {Array.<String>}  attrs Nombre de las propiedades de los datos
     * cuyos valores afectan al filtro.
     * @param {Function}       func  Función que filtra. Debe devolver
     * ``true`` (sí filtra) o ``false``.
     */
    registerF: function registerF() {
      var filter = this.prototype.options.filter;
      if (!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");
      return _filtersys_js__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"].prototype.register.apply(this.prototype.options.filter, arguments) && this;
    },

    /**
     * Habilita un filtro para las marcas de una clase
     * @method Marker.filter
     *
     * @param {string} name    Nombre del filtro.
     * @param {Object} params  Opciones para el filtrado.
     */
    filter: function filter(name, params) {
      var filter = this.prototype.options.filter;
      if (!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?"); // El filtro no existe o ya estaba habilitado con los mismo parámetros.

      if (!filter.setParams(name, params, true)) return false;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.store[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var marker = _step8.value;
          marker.applyF(name);
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      this.fire("filter:*", {
        name: name,
        opts: params
      }); // Issue #54

      this.fire("filter:".concat(name), {
        name: name,
        opts: params
      }); // Issue #54

      return this;
    },

    /**
     * Deshabilita un filtro para las marcas de una clase
     * @method Marker.unfilter
     *
     * @param {string} name    Nombre del filtro.
     */
    unfilter: function unfilter(name) {
      var filter = this.prototype.options.filter;
      if (!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");
      var params = filter.getParams(name); // Issue #54

      if (!filter.disable(name)) return false; // El filtro no existe o está deshabilitado.

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = this.store[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var marker = _step9.value;
          marker.unapplyF(name);
        } // #Issue #54

      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      this.fire("unfilter:*", {
        name: name,
        opts: params
      }); // Issue #54

      this.fire("unfilter:".concat(name), {
        name: name,
        opts: params
      }); // Issue #54
      // Fin #issue 54

      return this;
    },

    /**
     * Cambia el estilo de filtro.
     * @method Marker.setFilter
     *
     * @param {Function|String|L.LayerGroup}  style     Estilo del filtro.
     * Consulte los valores posibles de la opción :attr:`filter <Marker#options>` para
     * saber qué valor de estilo suministrar.
     */
    setFilterStyle: function setFilterStyle(style) {
      var filter = this.prototype.options.filter;
      if (!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");
      filter.setStyle(style, this);
    },

    /**
     * Comprueba si ls marcas tienen aplicado un filtro.
     * @method Marker.hasFilter
     *
     * @param {String} name    Nombre del filtro.
     *
     * @return {Boolean}
     */
    hasFilter: function hasFilter(name) {
      var filter = this.prototype.options.filter;
      if (!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");
      return filter.getFilters().indexOf(name) !== -1;
    },

    /**
     * Devuelve el estado actual de los filtros aplicados sobre las marcas del tipo
     * @method Marker.getFilterStatus
     *
     * @param {String} name  Nombre de filtro. Si se especifica uno, sólo se devuelven
     * las opciones de aplicación de ese filtro en concreto.
     *
     * @returns {Object} Un objeto en que las claves son los nombres de los filtros y
     * los correspondientes valores sus opciones de aplicación; o bien, si se proporcionó
     * un nombre de filtro, las opciones de aplicación de ese filtro.
     */
    getFilterStatus: function getFilterStatus(name) {
      var filter = this.prototype.options.filter;
      if (!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");
      if (name) return filter.getParams(name);
      var ret = {};
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = filter.getFilters()[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _name3 = _step10.value;
          ret[_name3] = filter.getParams(_name3);
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      return ret;
    } // Fin issue #5

  },

  /**
   * Informa de si la marca se encuentra en el ``store``
   * del tipo de marca con la que se creó.
   */
  _belongsTo: function _belongsTo() {
    var store = Object.getPrototypeOf(this).constructor.store;
    return store.indexOf(this) !== -1;
  },

  /**
   * Refresca el dibujo de la marca.
   *
   * @param {L.LayerGroup} force   Capa a la que se añade la marca
   * a la fuerza. Esto es útil cuando se pasa de un estilo de filtro
   * en que las marcas filtradas se ocultan a otro en que no se hace,
   * ya la ocultación se implementa expulsando la marca de la capa.
   * Véase :meth:`FilterSys.setStyle`.
   */
  refresh: function refresh(force) {
    var div = this.getElement(); // Issue #5

    var filter = this.options.filter;

    if (filter) {
      if (filter.hideable) {
        if (this.filtered) {
          // Si la capa es MarkerClusterGroup. la marca puede estar
          // en la capa, aunque no se esté en el mapa.
          filter.transform.removeLayer(this);
          div = undefined;
        } else {
          // Debe comprobarse si la marca sigue estando
          // en el ``store``, para evitar que el refresco añada
          // a la capa una marca que ya se desechó con un .reset().
          if (!div && this._belongsTo()) {
            filter.transform.addLayer(this);
            div = this.getElement();
          }
        }
      } else {
        if (div) filter.transform.call(div, this.filtered);else if (force && this._belongsTo()) {
          force.addLayer(this);
          div = this.getElement();
        }
      }
    } // Fin issue #5


    if (!div) return false; // La marca no está en el mapa.

    this.options.icon.refresh();
  },

  /**
   * Wrapper para el método homónimo original. Se encarga de
   * convertir en un descriptor de acceso la propiedad a la que
   * se conectan los datos, de almacenar en :attr:`Marker.store`
   * la nueva marca, y de algunos aspectos menores más.
   */
  initialize: function initialize() {
    L.Marker.prototype.initialize.apply(this, arguments);
    this.constructor.store.push(this);
    if (this.options.icon) this.options.icon._marker = this; // Issue #22

    var firstDot = this.options.mutable.indexOf(".");
    var feature = firstDot === -1 ? this.options.mutable : this.options.mutable.substring(0, firstDot);
    Object.defineProperty(this, "_" + feature, {
      value: undefined,
      writable: true,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(this, feature, {
      get: function get() {
        return this["_" + feature];
      },
      set: function set(value) {
        this["_" + feature] = value; // Creamos este tipo de evento que se lanza
        // al asociar la marca a los datos.

        this.fire("dataset");
      },
      configurable: false,
      enumerable: false
    }); // Se pasan los arrays de los datos a correctables
    // y se aplican a la nueva marca filtros y correcciones aplicados.

    this.on("dataset", function (e) {
      this._prepare(); // Issue #5
      // Aplicamos a los nuevos datos los filtros ya aplicadas
      // a los datos de las restantes marcas de la misma clase.


      var filter = this.options.filter;

      if (filter) {
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = filter.getFilters()[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var name = _step11.value;
            this.applyF(name);
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
              _iterator11.return();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }
      } // Fin issue #5
      // Y los mismo con las correcciones


      var corr = this.options.corr;

      for (var _name4 in corr.getCorrections()) {
        if (corr.getOptions(_name4).params) this.apply(_name4);
      }
    }); // Fin issue #22
    // Issue #5

    Object.defineProperty(this, "_filtered", {
      value: [],
      writable: true,
      configurable: false,
      enumerable: false
    }); // Fin Issue #5
  },

  /**
   * Wrapper para el método homónimo original. Se encarga de conectar
   * la marca al icono.
   */
  setIcon: function setIcon(icon) {
    icon._marker = this;
    L.Marker.prototype.setIcon.apply(this, arguments);
  },

  /**
   * Prepara los datos recién conectado a la marca. Es un método interno
   * del que hace uso, el descriptor de acceso al que se fijan los datos.
   * @private
   */
  _prepare: function _prepare() {
    // Convierte Arrays en Correctables.
    var data = this.getData();
    if (data === undefined) return false; // La marca no posee los datos.

    this.options.corr.prepare(data);
    return true;
  },

  /**
   * Actualiza el icono asociado a la marca con los datos suministrados.
   * @private
   * @param {Object] data  Los datos con los que se quiere actualizar el icono.
   */
  _updateIcon: function _updateIcon(data) {
    var icon = this.options.icon;
    if (icon.options.params) icon.options.params.change(icon.options.converter.run(data));
  },
  // Issue #33

  /**
   * Modifica arbitrariamente los datos asociados a la marca.
   * @param {Object} data  Datos que se quieren añadir a los datos preexistentes.
   *
   * @return {Object} El resultado de haber realizado la fusión.
   */
  changeData: function changeData(data) {
    var ret = Object.assign(this.getData(), data); // Bug #92

    var filter = this.options.filter,
        attrs = Object.keys(data);

    if (filter) {
      // Aplicamos los filtros que pueden verse afectados
      // por el cambio, o sea aquellos que dependen de alguno
      // de los datos que han cambiado.
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = filter.getFilters()[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var name = _step12.value;
          var depends = false;
          var _iteratorNormalCompletion13 = true;
          var _didIteratorError13 = false;
          var _iteratorError13 = undefined;

          try {
            for (var _iterator13 = filter[name].prop.depends[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
              var x = _step13.value;

              if (attrs.indexOf(x) !== -1) {
                depends = true;
                break;
              }
            }
          } catch (err) {
            _didIteratorError13 = true;
            _iteratorError13 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion13 && _iterator13.return != null) {
                _iterator13.return();
              }
            } finally {
              if (_didIteratorError13) {
                throw _iteratorError13;
              }
            }
          }

          if (depends) this.applyF(name);
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    } // Fin bug #92.


    this._updateIcon(data);

    return ret;
  },
  // Fin issue #33

  /**
   * Devuelve los datos asociados a la marca.
   */
  getData: function getData() {
    // Devuelve los datos asociados a la marca.
    return Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_19__[/* getProperty */ "e"])(this, this.options.mutable);
  },

  /**
   *  Aplica una corrección a la marca. No debería usarse directamente, 
   *  ya que las correcciones deben aplicarse a través de {@link Marker.correct}.
   *  @private
   *
   *  @param {String} name   Nombre de la corrección
   */
  apply: function apply(name) {
    var corr = this.options.corr,
        opts = corr.getOptions(name),
        params = opts.params;
    var arr, ret; // La resolución de issue #22, hace que esto ocurra sólo
    // si se registra la corrección después de haber añadido la marca.

    if (!(arr = corr.isCorrectable(opts.attr, this))) {
      corr._prepare(this.getData(), opts.attr);

      arr = Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_19__[/* getProperty */ "e"])(this.getData(), opts.attr).correctable;
    }

    if (ret = arr.apply(this, name)) {
      // Issue #5
      var filter = this.options.filter;

      if (filter) {
        var _iteratorNormalCompletion14 = true;
        var _didIteratorError14 = false;
        var _iteratorError14 = undefined;

        try {
          for (var _iterator14 = filter.getFilters(opts.attr)[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var f = _step14.value;
            this.applyF(f);
          }
        } catch (err) {
          _didIteratorError14 = true;
          _iteratorError14 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion14 && _iterator14.return != null) {
              _iterator14.return();
            }
          } finally {
            if (_didIteratorError14) {
              throw _iteratorError14;
            }
          }
        }
      } // Fin issue #5


      this._updateIcon(_defineProperty({}, opts.attr, Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_19__[/* getProperty */ "e"])(this.getData(), opts.attr)));
    } // Issue #37


    if (!opts.auto) return ret;
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
      for (var _iterator15 = opts.chain[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
        var chain = _step15.value;

        var newname = name + " " + chain.corr,
            _opts = corr.getOptions(newname); // Es la primera vez que se aplica la corrección
        // sobre alguna de las marcas, por lo que no están calculados los parámetros


        if (_opts.params === undefined) {
          if (_opts.add) {
            console.warn("".concat(corr, ": No puede ser el eslab\xF3n de una cadena porque es una correcci\xF3n adictiva"));
            _opts.params = corr.setParams(newname, false);
          }

          if (corr.looped(name, chain.corr)) {
            console.debug("".concat(corr, ": Correcci\xF3n ya aplicada en la cadena de correciones. Se salta para evitar refencias circulares."));
            _opts.params = corr.setParams(newname, false);
          }

          var markerClass = Object.getPrototypeOf(this).constructor;
          _opts.params = corr.setParams(newname, chain.func.call(markerClass, params));
        }

        if (_opts.params !== false) ret = this.apply(newname) || ret;
      } // Fin issue #37

    } catch (err) {
      _didIteratorError15 = true;
      _iteratorError15 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion15 && _iterator15.return != null) {
          _iterator15.return();
        }
      } finally {
        if (_didIteratorError15) {
          throw _iteratorError15;
        }
      }
    }

    return ret;
  },

  /**
   * Elimina una corrección de la marca. No debería usarse directamente, 
   * ya que las correcciones deben eliminarse a través de :meth:`Marker#uncorrect`.
   * @private
   *
   * @param {String} name    Nombre de la corrección.
   */
  unapply: function unapply(name) {
    // Elimina la corrección.
    var corr = this.options.corr,
        opts = corr.getOptions(name),
        arr = Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_19__[/* getProperty */ "e"])(this.getData(), opts.attr).correctable;
    var ret;

    if (ret = arr.unapply(name)) {
      // Issue #5
      var filter = this.options.filter;

      if (filter) {
        var _iteratorNormalCompletion16 = true;
        var _didIteratorError16 = false;
        var _iteratorError16 = undefined;

        try {
          for (var _iterator16 = filter.getFilters(opts.attr)[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var f = _step16.value;
            this.applyF(f);
          }
        } catch (err) {
          _didIteratorError16 = true;
          _iteratorError16 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion16 && _iterator16.return != null) {
              _iterator16.return();
            }
          } finally {
            if (_didIteratorError16) {
              throw _iteratorError16;
            }
          }
        }
      } // Fin issue #5


      this._updateIcon(_defineProperty({}, opts.attr, Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_19__[/* getProperty */ "e"])(this.getData(), opts.attr)));
    } // Issue #37


    if (!opts.auto) return ret;
    var _iteratorNormalCompletion17 = true;
    var _didIteratorError17 = false;
    var _iteratorError17 = undefined;

    try {
      for (var _iterator17 = opts.chain[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
        var chain = _step17.value;

        var newname = name + " " + chain.corr,
            _opts2 = corr.getOptions(newname);

        if (!_opts2.params) continue; // No se aplicó.

        ret = this.unapply(newname) || ret;
      } // Fin issue #37

    } catch (err) {
      _didIteratorError17 = true;
      _iteratorError17 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion17 && _iterator17.return != null) {
          _iterator17.return();
        }
      } finally {
        if (_didIteratorError17) {
          throw _iteratorError17;
        }
      }
    }

    return ret;
  },
  // Issue #5

  /**
   * Aplica un filtro a la marca. No debería usarse directamente, 
   * ya que los filtros deben aplicarse a través de :meth:`Marker#filter`.
   * @private
   *
   * @param {String} El nombre del filtro.
   */
  applyF: function applyF(name) {
    var filter = this.options.filter;
    if (!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filtro al crear la clase de marca?");
    var params = filter.getParams(name),
        res = filter[name].call(this, params);

    if (res) {
      if (this._filtered.indexOf(name) === -1) {
        this._filtered.push(name); // Issue #56
        // El evento sólo se produce cuando un centro sin filtrar, se filtra.


        if (this._filtered.length === 1) {
          this.fire("filtered", {
            name: name,
            opts: params
          });
        } // Fin issue #56

      }
    } else this.unapplyF(name);

    return res;
  },

  /**
   * Elimina un filtro de la marca.No debería usarse directamente, 
   * ya que los filtros deben eliminarse a través de :meth:`Marker#unfilter`.
   * @private
   *
   * @param {String} El nombre del filtro.
   */
  unapplyF: function unapplyF(name) {
    var filter = this.options.filter;
    if (!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filtro al crear la clase de marca?");

    var params = filter.getParams(name),
        idx = this._filtered.indexOf(name);

    if (idx !== -1) {
      this._filtered.splice(idx, 1); // Issue #56
      // El evento sólo se produce cuando un centro filtrado, deja de estarlo


      if (this._filtered.length === 0) {
        this.fire("unfiltered", {
          name: name,
          opts: params
        });
      } // Fin issue #56

    }

    return idx !== 1;
  } // Fin issue #5

}));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(30)))

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);





// Issue #5

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
      get: function get() {
        return this._transform;
      },
      set: function set(value) {
        if (this.hideable) this.transform.off("layeradd", this.ejectFiltered);

        if (typeof value === "string") {
          this._transform = function (filtered) {
            if (filtered) this.classList.add(value);else this.classList.remove(value);
          };
        } else {
          this._transform = value;
          if (this.hideable) this.transform.on("layeradd", this.ejectFiltered);
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
  get: function get() {
    return this.transform instanceof L.LayerGroup;
  },
  configurable: false,
  enumerable: false
});
/**
 * Expulsa automáticamente de la capa las marcas filtradas.
 * @method FilterSys#ejectFiltered
 */

FilterSys.prototype.ejectFiltered = function (e) {
  return e.layer.refresh();
};
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


FilterSys.prototype.register = function (name, obj) {
  if (this[name]) {
    console.warn("".concat(name, ": El filtro ya est\xE1 registrado"));
    return false;
  }

  if (!(obj.attrs instanceof Array)) obj.attrs = [obj.attrs];
  obj.func.prop = {
    depends: obj.attrs,
    enabled: false,
    params: undefined
  };
  this[name] = obj.func;
  return this;
};
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


FilterSys.prototype.getFilters = function (attr) {
  var _this = this;

  return Object.keys(this).filter(function (filter) {
    return _this[filter].prop.enabled && (!attr || _this[filter].prop.depends.indexOf(attr) !== -1);
  });
};
/**
 * Habilita un filtro
 * @memberof FilterSys
 *
 * @param {String} name  El nombre del filtro que se quiere habilitar.
 */


FilterSys.prototype.enable = function (name) {
  if (!this.hasOwnProperty(name) || this[name].prop.enabled) return false;
  this[name].prop.enabled = true;
  return this;
};
/**
 * Deshabilita un filtro
 * @memberof FilterSys
 *
 * @param {string} name  El nombre del filtro que se quiere deshabilitar.
 */


FilterSys.prototype.disable = function (name) {
  if (!this.hasOwnProperty(name) || !this[name].prop.enabled) return false;
  this[name].prop.enabled = false;
  this[name].prop.params = undefined;
  return this;
};
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


FilterSys.prototype.setParams = function (name, opts, enable) {
  if (!this.hasOwnProperty(name)) return false;
  if (!enable && !this[name].prop.enabled) return false; // No se fuerza la habilitación y no está habilitado.
  else this[name].prop.enabled = true;
  if (Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_5__[/* equals */ "d"])(this[name].prop.params, opts)) return false;
  this[name].prop.params = opts;
  return this;
};
/**
 * Obtiene las opciones de filtrado de un determinado filtro.
 * @memberof FilterSys
 *
 * @param {string} name    El nombre del filtro.
 *
 * @return {Object}
 */


FilterSys.prototype.getParams = function (name) {
  if (!this.hasOwnProperty(name)) throw new Error("".concat(name, ": filtro no registrado"));
  return this[name].prop.params;
};
/**
 * Modifica el estilo de filtrado.
 * @memberof FilterSys
 *
 * @param {Function|L.LayerGroup|String} style  Estilo de filtrado. Consulte el
 * {@link Marker#options valor de la opción filter para Marker.prototype.options}
 * @param {Marker} markerClass    Clase de marca a la que pertenecen
 *    todas las marcas que usan este objeto de filtrado.
 */


FilterSys.prototype.setStyle = function (style, markerClass) {
  var old = this.transform,
      exhideable = old instanceof L.LayerGroup;
  this.transform = style; // Si el estilo anterior ocultaba las marcas y el nuevo no lo hace,
  // las marcas filtradas deben añadirse a la capa y ésta debe pasarse
  // a refresh como parámetro.

  markerClass.invoke("refresh", null, exhideable && !this.hideable && old);
}; // Issue #40

/**
 * Resetea el objeto.
 *
 * @param {Boolean} deep  Si ``true``, elimina del sistema los filtros;
 * de lo contrario, sólo los marca como desaplicados.
 */


FilterSys.prototype.reset = function (deep) {
  if (deep) for (var name in this) {
    delete this[name];
  } else for (var _name in this) {
    this.disable(_name);
  }
  return this;
}; // Fin issue #40


/* harmony default export */ __webpack_exports__["a"] = (FilterSys);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(30)))

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.last-index-of.js
var es_array_last_index_of = __webpack_require__(145);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(50);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-property.js
var es_object_define_property = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(95);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(98);

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.some.js
var es_array_some = __webpack_require__(147);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(87);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-properties.js
var es_object_define_properties = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-names.js
var es_object_get_own_property_names = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__(90);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(148);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.to-string.js
var es_date_to_string = __webpack_require__(88);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(149);

// CONCATENATED MODULE: ./src/corrsys/value.js












function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @name Value
 * @hideconstructor
 * @class
 * @classdesc Genera un valor que permite conocer si está filtrado o no.
 * Si el valor es un objeto, simplemente, devuelve otro que añade la propiedad
 * ``filters`` que contiene en un Array los nombres de las correcciones que han filtrado el valor.
 * Si el valor es un tipo primitivo, genera un objeto que almacena en la propiedad ``value`` el
 * valor original y en ``filters`` la lista de correcciones que lo filtran.
 */
function Value(value, filters) {
  Object.defineProperty(this, "__primitive", {
    value: _typeof(value) !== "object" || value === null,
    writable: false,
    configurable: false,
    enumerable: false
  });
  if (this.isPrimitive()) this.value = value;else {
    if (value.filters !== undefined) console.warn("El valor original del array posee un atributo filters y se perderá");
    Object.assign(this, value);
  }
  Object.defineProperty(this, "filters", {
    value: filters,
    writable: false,
    configurable: false,
    enumerable: false
  });
}

Value.prototype.isPrimitive = function () {
  return this.__primitive;
};

Value.prototype.valueOf = function () {
  if (this.isPrimitive()) return this.value;else return this;
};

Value.prototype.toString = function () {
  if (this.isPrimitive()) return this.value.toString();else return Object.prototype.toString.call(this);
};

/* harmony default export */ var value = (Value);
// CONCATENATED MODULE: ./src/corrsys/correctable.js



















var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(iterator);


/*
 * Convierte un array en un array con esteroides. Básicamente, el array
 * (llamémoslo *A*) pasa a tener un atributo *corr*, que es un objeto cuyas
 * claves son las correcciones aplicadas sobre *A* y cuyos valores son arrays de
 * longitud idéntica a *A*. Cada elemento de estos arrays represente el efecto
 * que ha tenido la corrección sobre el elemento correspondiente de *A*:
 *
 * - ``true``:  la correción filtró el elemento.
 * - ``false``: la corrección no filtró el elemento.
 * - ``undefined``: la corrección no se aplicó sobre ese elemento.
 * - ``null``: la corrección creó el elemento.
 *
 * Un ejemplo esquemático:
 *
 *            [ valor1   , valor2    , valor3]
 *  {
 *    corr1:  [ true     , true      , false ]
 *    corr2:  [ undefined, undefined ,  null ]
 *  }
 *
 * En este caso, el *valor1* lo eliminan ambas correcciones. el *valor2*
 * sólo *corr1*, y el *valor3* lo añade *corr2* y no lo elimina *corr1*.
 *
 */

/**
 * @name Correctable
 * @hideconstructor
 * @class
 * @classdesc La clase permite apuntar sobre el array qué elementos han sido filtrados
 * por cuáles correcciones y qué nuevos elementos han sido añadidos y por cuál corrección.
 * @param {Array} arr El array original.
 * @param {Object} sc Parte del :js:class:`sistema de correcciones <CorrSys>` que se aplica
 * exclusivamente al array.
 */

var Prototype = {
  /**
   * Devuelve las correcciones que han eliminado el elemento idx del array.
   *
   * @param {int} idx Índice del elemento que se quiere consultar.
   * @returns {Array} Array con los nombres
   */
  filters: function filters(idx) {
    var _this = this;

    return Object.keys(this.corr).filter(function (n) {
      return _this.corr[n][idx];
    }).map(function (c) {
      return _this._sc.getOriginal(c);
    });
  },

  /**
   * @typedef {Object} Correctable.CorrValue
   * @property {?*} value   El valor del elemento o ``null``, si alguna corrección lo eliminó.
   * @property {Array.<String>} filters  Los nombres de las correcciones que eliminan el elemento.
   */

  /**
   * Aplica una determinada corrección sobre el array.
   *
   * @param {Marker} marker  Marca a la que pertenece el :class:`Correctable`
   * @param {String} name    El nombre de la corrección.
   *
   * @returns {boolean}  ``true`` Si la correción
   *    provocó algún cambio en el array.
   */
  apply: function apply(marker, name) {
    var opts = this._sc.getOptions(name);

    if (opts.add) {
      // La corrección ya estaba aplicada: la desaplicamos.
      if (this.corr.hasOwnProperty(name)) this.unapply(name);
      var values = opts.func.call(marker, null, this, opts.params);
      var num = values.length;
      if (num === 0) return false;
      Array.prototype.push.apply(Object.getPrototypeOf(this), values);
      this.corr[name] = new Array(this.length);

      for (var i = this.length - num; i < this.length; i++) {
        this.corr[name][i] = null;
      }

      this._count = undefined; // Las correcciones que eliminan valores,
      // pueden eliminar los valores añadidos.

      for (var n in this.corr) {
        var _opts = this._sc.getOptions(n);

        this.corr[n].length = this.length;
        if (_opts.add) continue; // Es una corrección que añade valores.

        for (var _i = this.length - num; _i < this.length; _i++) {
          this.corr[n][_i] = _opts.func.call(marker, _i, this, _opts.params);
        }
      }

      return true;
    } else {
      var ret = false;
      if (!this.corr.hasOwnProperty(name)) this.corr[name] = new Array(this.length);

      for (var _i2 = 0; _i2 < this.length; _i2++) {
        var prev = this.corr[name][_i2];
        this.corr[name][_i2] = opts.func.call(marker, _i2, this, opts.params);
        if (prev ^ this.corr[name][_i2]) ret = true; // La corrección cambia sus efectos.
      }

      if (ret) this._count = undefined;
      return ret;
    }
  },

  /**
   * Deshace una determinada corrección hecha previamente.
   *
   * @param {String} name Nombre de la corrección.
   *
   * @returns {Boolean}  ``true`` si eliminar la corrección
   *    provocó cambios en el *array*.
   */
  unapply: function unapply(name) {
    var opts = this._sc.getOptions(name);

    if (opts.add) {
      if (!this.corr.hasOwnProperty(name)) return false; // No se había aplicado.

      var arr = this.corr[name];
      delete this.corr[name];
      var a, b;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === null) {
          if (a === undefined) a = i;
        } else if (a !== undefined) {
          b = i;
          break;
        }
      }

      if (a === undefined) return false;
      if (b === undefined) b = arr.length;
      this._count = undefined; // Eliminamos los valores al array añadidos por esta corrección

      Object.getPrototypeOf(this).splice(a, b - a);

      for (var _name in this.corr) {
        this.corr[_name].splice(a, b - a);
      }
    } else {
      if (!this.corr.hasOwnProperty(name)) return false; // No se había aplicado.

      var _arr = this.corr[name];
      delete this.corr[name];
      if (_arr.some(function (e) {
        return e;
      })) this._count = undefined;else return false;
    }

    return true;
  },

  /**
   * Limpia el array de todas las correcciones.
   */
  clear: function clear() {
    var _this2 = this;

    // Primer elemento que tiene un null (o sea, no formaba parte del array original.
    var idx = Math.min.apply(null, Object.keys(this.corr).map(function (k) {
      return _this2.corr[k].indexOf(null);
    }).filter(function (e) {
      return e >= 0;
    }));
    this.length = idx;

    for (var name in Object.getOwnPropertyNames(this.corr)) {
      delete this.corr[name];
    }
  } // Total de elementos excluyendo los eliminados por correcciones.

};

function total() {
  if (this._count !== undefined) return this._count;
  this._count = 0;

  for (var i = 0; i < this.length; i++) {
    if (this.filters(i).length === 0) this._count++;
  }

  return this._count;
}
/**
 * Iterador que genera un objeto Value para cada elemento del array
 * a fin de que se pueda saber si el valor está o no filtrado.
 * @generator
 */


function iterator() {
  var i;
  return regeneratorRuntime.wrap(function iterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < this.length)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return new value(this[i], this.filters(i));

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/* harmony default export */ var corrsys_correctable = (function (arr, sc) {
  if (!(arr instanceof Array)) throw new TypeError("El objeto no es un array");
  var obj = Object.assign(Object.create(arr), Prototype);
  Object.defineProperties(obj, {
    "_sc": {
      value: sc,
      writable: false,
      enumerable: false,
      configurable: false
    },

    /**
     * Objeto que almacena las correcciones del array.
     * Cada clave es el nombre de la corrección y cada valor
     * un array 
     */
    "corr": {
      value: {},
      writable: false,
      enumerable: false,
      configurable: false
    },
    // Pre-almacena el número de elementos para mejorar el rendimiento.
    "_count": {
      value: arr.length,
      writable: true,
      configurable: false,
      enumerable: false
    },

    /**
     * Longitud del array corregido, descontados los valores anulados.
     * @name Correctable#total
     * @type {Number}
     */
    "total": {
      get: total,
      enumerable: false,
      configurable: false
    }
  });
  obj[Symbol.iterator] = iterator;
  return obj;
});
// EXTERNAL MODULE: ./src/utils/index.js + 3 modules
var utils = __webpack_require__(1);

// CONCATENATED MODULE: ./src/corrsys/index.js


















function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



/**
 * @name CorrSys
 * @class
 * @hideconstructor
 * @classdesc Implemeta un sistema para realizar correcciones sobre los atributos
 * *array* de un objeto. Las correcciones consisten bien en filtrar sus elementos,
 * bien en añadir nuevos.
 *
 * El sistema de correcciones estará constituido por varias correcciones, cada una
 * de las cuales tiene un nombre y afectará a un atributo del objeto.
 * Varias correcciones podrán afectar a un mismo atributo, pero una
 * corrección no podrá afectar a varios atributos.
 *
 * Puede ocurrir también que la aplicación de una corrección desencadene
 * automáticamente la aplicación de una o más correcciones que afectan a otros
 * atributos. En este caso, si la corrección que se aplica es "bilingue" y la
 * corrección que se desencadena automáticamente es "adjpue", la corrección
 * automática se identificará como "bilingue adjpue".
 * 
 * Las :js:class:`clases de marcas definidas como mutables <Marker>` definen
 * automáticamente una opción ``corr`` que es un objeto de este tipo, de modo
 * que cuando se usan métodos que definen o aplican correcciones obre las marcas
 * de la clase (:js:meth:`Marker.register`, :js:meth:`Marker.correct`,
 * :js:meth:`Marker.uncorrect`) se utiliza este objeto.`
 *
 */

function CorrSys() {}
/**
 * Registra una corrección.
 * @method CorrSys#register
 *
 * @param {String} name Nombre de la corrección
 * @param {Object} obj  Objeto que define la corrección. :js:meth:`Marker.register` 
 * para saber cómo es este objeto.
 * @param {Array} chain  Correcciones que se aplicarán automáticamente
 * tras la aplicación de esta corrección. Cada elemento es un objeto con dos atributos,
 * el nombre de la corrección que se desencadena (``corr``) y la función que
 * transforma las opciones de la corrección aplicada en opciones de la corrección
 * desencadena. Si la aplicación concreta de la corrección no debe provocar el
 * desencadenamiento de la segunda corrección, debe devolverse ``false``.
 *
 * @returns {CorrSys} El propio objeto
 */


CorrSys.prototype.register = function (name, obj) {
  // Internamente el objeto tiene la forma
  // {
  //   prop1: {
  //             corr1: func1,
  //             corr2: func2
  //          },
  //   prop2: {
  //             corr3: func3
  //          }
  // }
  //
  // propX son los nombres de las propiedades de los datos. Si la propiedad
  // está anidada se usa la notación del punto.
  // corrX es el nombre de la corrección.
  // funcX: Es la función de corrección a la que se le añaden algunas características.
  //       - nombre.
  //       - si es aditiva.
  //       - con qué parámetros se ha aplicado.
  //       - la cadena de correcciones.
  var sc = this[obj.attr] = this[obj.attr] || {};

  if (sc.hasOwnProperty(name)) {
    console.warn("".concat(name, ": La correcci\xF3n ya est\xE1 registrada"));
    return false;
  } // Apuntamos en una propiedad de la función, el nombre de la corrección,
  // si es aditiva, y con qué opciones se ha aplicado.


  obj.func.prop = {
    name: name,
    add: obj.add,
    apply: obj.apply || utils["d" /* equals */],
    // Issue #58
    default_auto: obj.autochain || false,
    // Issue #39
    params: null,
    // Issue #23.
    // Issue #37
    chain: obj.chain || [],
    // Correcciones que aplica automáticamente esta corrección
    chain_params: {} // key: eslabones previos de la cadena de correcciones.
    // value: las opciones de corrección
    // Fin issue # 37

  };
  sc[name] = obj.func;
  return this;
}; // Issue #58

/** 
 * Comprueba si las opciones de aplicación suministradas son inútiles,
 * porque ya hay al menos otra aplicación de la corrección que abarca
 * tales opciones.
 *
 * @param {String} name Nombre de la corrección.
 * @param {Object} params Opciones de aplicación.
 * @param {Object} type Tipo de comprobación que puede ser "*manual*",
 * si sólo se pretende consultar la anterior aplicación manual de la
 * corrección, "*auto*", si sólo se pretenden consultar las aplicaciones
 * automáticas de la corrección; y cualquier otro valor para consultar
 * todas.
 */


CorrSys.prototype.isApplied = function (name, params, type) {
  var opts = this.getOptions(name);
  var a_params = [];
  if (type !== "auto" && opts.params) a_params.push(opts.params);

  if (type !== "manual") {
    var _params = this.getAutoParams(name);

    _params = Object.keys(_params).map(function (c) {
      return _params[c];
    });
    a_params.push.apply(a_params, _params);
  }

  for (var _i = 0, _a_params = a_params; _i < _a_params.length; _i++) {
    var oldparams = _a_params[_i];
    if (opts.apply(oldparams, params)) return true;
  }

  return false;
}; // Fin issue #58
// Issue #37

/**
 * Normaliza el nombre. Las correcciones encadenadas forman su nombre
 * encadenando todos los eslabones de la cadena y separándolos por espacio.
 * Por ejemplo, "*bilingue adjpue*" es la corrección *adjpue* que aplica
 * automáticamente otra corrección llamda bilingue. En este ejemplo,
 * el nombre normalizado es "*adjpue*" y el prenombre "*bilingue*"
 * @method CorrSys#_normalizeName
 * @private
 *
 * @param {String} name El nombre que se quiere normalizar,
 * @param {Boolean} prename Si se quiere obtener también el prenombre.
 *
 * @returns {String|Array.<String>}  El nombre normalizado o un array
 * con el nombre normalizado y el prenombre si el argumento ``prename`` era
 * ``true``.
 */


CorrSys.prototype._normalizeName = function (name, prename) {
  var lastSpace = name.lastIndexOf(" ");
  if (lastSpace === -1) return prename ? ["", name] : name;else {
    var res = name.substring(lastSpace + 1);
    return prename ? [name.substring(0, lastSpace), res] : res;
  }
}; // Fin #issue 37

/**
 * Informa de si la propiedad de una marca es corregible.
 * @method CorrSys.prototype.isCorrectable
 *
 * @param {String} attr     Nombre de la propiedad que se quiere investigar. Es admisible
 *    la notación de punto para propiedades anidadas.
 * @param {Marker} marker Marca donde se encuentra la propiedad
 * @returns {?Correctable}   La propia propiedad si es corregible, o nulo.
 */


CorrSys.prototype.isCorrectable = function (attr, marker) {
  var arr = Object(utils["e" /* getProperty */])(marker.getData(), attr);
  if (arr && arr.correctable) return arr.correctable;else null;
};
/**
 * Devuelve las correcciones aplicables a una propiedad.
 * @method CorrSys#getCorrections
 *
 * @param {?String} attr  Nombre de la propiedad. Si es ``null``, devolverá
 * los nombres de todas las correcciones.
 *
 * @returns {?Object.<String, Function>}  Un objeto en que cada atributo es el nombre
 * de las corrección y cada valor la función que la define.
 */


CorrSys.prototype.getCorrections = function (attr) {
  if (attr) return this[attr] || null;else {
    var res = {};

    for (var _attr in this) {
      Object.assign(res, this[_attr]);
    }

    return res;
  }
};
/**
 * Devuelve el nombre de todas las correcciones aplicadas
 * manualmente y las opciones con las que se aplican.
 *
 * @returns {Object} Un objeto cuyas claves son los nombres
 * de las correcciones aplicadas y cuyos valores son las opciones.
 */


CorrSys.prototype.getAppliedCorrections = function () {
  var ret = {},
      corrs = this.getCorrections();

  for (var name in corrs) {
    var opts = corrs[name].prop;
    if (!opts.params) continue;
    ret[name] = opts;
  }

  return ret;
};
/**
 * Devuelve las propiedades corregibles.
 * @method CorrSys#list
 *
 * @returns {Array.<String>}
 */


CorrSys.prototype.list = function () {
  return Object.keys(this);
};
/**
 * Prepara un objeto convirtiendo los arrays en Correctables.
 * @method CorrSys#prepare
 *
 * @param {Object} obj  El objeto que sufrirá el cambio.
 * @param {String} prop Un array concreto del objeto que se quiere convertir
 *    en Correctable. Si no se especifica, se buscan todos para los
 *    que se hayan definido al menos una corrección.
 */


CorrSys.prototype.prepare = function (obj, prop) {
  var _this = this;

  var attrs = prop === undefined ? this.list() : [prop];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var attr = _step.value;
      var o = void 0,
          name = void 0;
      var idx = attr.lastIndexOf(".");

      if (idx === -1) {
        o = obj;
        name = attr;
      } else {
        o = Object(utils["e" /* getProperty */])(obj, attr.substring(0, idx));

        if (o === undefined) {
          console.error("El objeto carece de la propiedad " + attr.substring(0, idx));
          return "continue";
        }

        name = attr.substring(idx + 1);
      } // Consideraremos que si falta el atributo, es un array vacío)


      if (o[name] === undefined) o[name] = [];

      if (!(o[name] instanceof Array)) {
        console.error("La propiedad no es un Array");
        return "continue";
      }

      var correctable = new corrsys_correctable(o[name], _this); // Issue #B.2

      Object.defineProperty(o, name, {
        get: function get() {
          var ret = Array.from(correctable).filter(function (e) {
            return e.filters.length === 0;
          }).map(function (e) {
            return e.isPrimitive() ? e.value : e;
          });
          ret.correctable = correctable;
          return ret;
        }
      }); // Fin #B.2
    };

    for (var _iterator = attrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};
/**
 * Devuelve la propiedad de los datos que corrige la corrección.
 * @method CorrSys#getProp
 *
 * @param {string} name  Nombre de la corrección
 *
 * @returns {string} El nombre de la propiedad en notación de punto.
 */


CorrSys.prototype.getProp = function (name) {
  name = this._normalizeName(name);

  for (var prop in this) {
    if (this[prop].hasOwnProperty(name)) return prop;
  }
};
/**
 * @typedef {Object} CorrSys.OptionsCorr
 * @property {?String}  prename  Eslabones previos de la cadena de correcciones.
 * @property {String}   name     Nombre de la corrección (sin eslabones previos).
 * @property {Boolean}  add      true, si la corrección agrega valores.
 * @property {Object}   params   Opciones de aplicación de la corrección.
 * @property {Array}    chain    Array con las correcciones que desenacadena
 * @property {String}   attr     El nombre de la propiedad sobre la que actúa la corrección.
 * @property {Function} func     La función de corrección.
 * automáticamente la corrección.
 */
// Issue #23 - Modificado por issue #37.

/**
 * Devuelve las características de una corrección
 * @method CorrSys.prototype.getOptions
 *
 * @param {String} name  Nombre de la corrección.
 *
 * @returns {OptionsCorr}
 */


CorrSys.prototype.getOptions = function (name) {
  var ret, prename;

  var _this$_normalizeName = this._normalizeName(name, true);

  var _this$_normalizeName2 = _slicedToArray(_this$_normalizeName, 2);

  prename = _this$_normalizeName2[0];
  name = _this$_normalizeName2[1];
  var property = this.getProp(name);
  if (!property) throw new Error("".concat(name, ": correcci\xF3n no registrada"));
  var sc = this[property];
  ret = {
    attr: property,
    func: sc[name]
  };
  Object.assign(ret, ret.func.prop);

  if (prename) {
    ret.params = ret.chain_params[prename];
    ret.prename = prename;
  }

  delete ret.chain_params;
  return ret;
};
/**
 * Establece unas nuevas opciones de aplicación de una determinada corrección.
 * @method CorrSys#setParams
 *
 * @params {String} name   Nombre de la corrección.
 * @params {Object} opts   Opciones de aplicación de la corrección.
 *
 * @returns {Object}   Las propias opciones.
 */


CorrSys.prototype.setParams = function (name, opts) {
  var sc = this[this.getProp(name)];
  if (!sc) throw new Error("".concat(name, ": correcci\xF3n no registrada"));

  var _this$_normalizeName3 = this._normalizeName(name, true),
      _this$_normalizeName4 = _slicedToArray(_this$_normalizeName3, 2),
      prename = _this$_normalizeName4[0],
      postname = _this$_normalizeName4[1];

  if (prename) {
    if (opts !== null) sc[postname].prop.chain_params[prename] = opts;else delete sc[postname].prop.chain_params[prename];
  } else sc[name].prop.params = opts; // Si se borran los opciones de corrección (se fijan a null), se deben
  // borrar recursivamente las opciones calculadas del resto de la cadena.
  // Issue #60: o si se fijan unas nuevas opciones manuales, resetear las calculadas.


  if (opts === null || !prename) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = sc[postname].prop.chain[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var chain = _step2.value;
        if (this.looped(name, chain.corr)) continue;
        this.setParams(postname + " " + chain.corr, null);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return opts;
}; // Fin issue #23

/**
 * Resetea el objeto.
 *
 * @param {Boolean} deep  Si ``true``, elimina del sistema las correcciones;
 *    de lo contrario, sólo las marca como desaplicadas.
 */


CorrSys.prototype.reset = function (deep) {
  if (deep) for (var prop in this) {
    delete this[prop];
  } else {
    var corrs = this.getCorrections();

    for (var name in corrs) {
      this.setParams(name, null);
    }
  }
  return this;
};
/**
 * Inicializa la corrección, fijando las opciones y si se deben
 * aplicar automáticamente las correcciones definidas en su cadena.
 * @params {String} name  El nombre de la corrección.
 * @params {Object} opts  Opciones de corrección.
 * @params {Boolean} auto Si ``true``, se aplicaráb las correciones de la cadena.
 *
 * @returns {CorrSys} El propio objeto.
 */


CorrSys.prototype.initialize = function (name, opts, auto) {
  this.setParams(name, opts);
  var sc = this[this.getProp(name)];

  try {
    sc[name].prop.auto = sc[name].prop.default_auto; // Issue #39

    if (auto !== undefined) sc[name].prop.auto = !!auto;
  } catch (error) {
    console.warn("¿Está intentando inicializar una corrección encadenada?");
    throw error;
  }

  return this;
};
/**
 * Comprueba si la cadena forma un bucle
 *
 * @param {String}  chain  Los nombres de las correcciones que forman la cadena.
 * @oaram {?String} name   La nueva corrección que se desea añadir a la cadena.
 * Si no se define, se entenderá que *chain* ya lo incorpora.
 *
 * @returns {Boolean} ``true``, si se forma bucle.
 */


CorrSys.prototype.looped = function (chain, name) {
  chain = chain.split(" ");
  if (!name) name = chain.pop();
  return chain.indexOf(name) !== -1;
};
/**
 * Devuelve todos las opciones con las que se ha aplicado automáticamente
 * una corrección.
 * 
 * @param {String} name  El nombre de la corrección.
 *
 * @returns {Object}  Un objeto en que las claves son las correcciones originales
 * que provocaron las correcciones y los valores las opciones de corrección.
 */


CorrSys.prototype.getAutoParams = function (name) {
  var sc = this[this.getProp(name)];
  if (!sc) throw new Error("".concat(name, ": correcci\xF3n no registrada"));
  name = this._normalizeName(name);
  var params = sc[name].prop.chain_params;
  var res = {};

  for (var n in params) {
    res[this.getOriginal(n)] = params[n];
  }

  return res;
};
/**
 * Devuelve la correccion original que desencadenó
 * la corrección que se consulta.
 *
 * @param {String} name  El nombre de la corrección.
 *
 * @returns {String} La corrección que originariamente
 * desencadenó la corrección suministrada.
 */


CorrSys.prototype.getOriginal = function (name) {
  var idx = name.indexOf(" ");
  return idx === -1 ? name : name.substring(0, idx);
}; // Fin issue #37

/**
 * Devuelve todas las correcciones que ha desencadenado
 * automáticamente la corrección suministrada y cuáles
 * han sido los parámetros con los que se ha desencadenado.
 * Se incluye a sí misma.
 *
 * @param {String} name  El nombre de la corrección desencadenante.
 *
 * @returns {Object} Objeto en que cada clave es una de las
 * correcciones desencadenadas y el valor, los parámetros con los
 * que se aplicó.
 */


CorrSys.prototype.getAutoCorrs = function (name, ret) {
  ret = ret || {};
  var sc = this[this.getProp(name)];
  if (!sc) throw new Error("".concat(name, ": correcci\xF3n no registrada"));

  var _this$_normalizeName5 = this._normalizeName(name, true),
      _this$_normalizeName6 = _slicedToArray(_this$_normalizeName5, 2),
      prename = _this$_normalizeName6[0],
      postname = _this$_normalizeName6[1];

  if (prename) {
    var opts = sc[postname].prop.chain_params[prename];
    if (opts) ret[postname] = opts;
  } else ret[name] = sc[name].prop.params;

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = sc[postname].prop.chain[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var chain = _step3.value;
      if (this.looped(name, chain.corr)) continue;
      this.getAutoCorrs(name + " " + chain.corr, ret);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return ret;
};

/* harmony default export */ var corrsys = __webpack_exports__["a"] = (CorrSys);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var fails = __webpack_require__(2);
var createElement = __webpack_require__(72);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var isObject = __webpack_require__(6);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34);

module.exports = shared('native-function-to-string', Function.toString);


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var ownKeys = __webpack_require__(114);
var getOwnPropertyDescriptorModule = __webpack_require__(40);
var definePropertyModule = __webpack_require__(7);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIndexedObject = __webpack_require__(14);
var indexOf = __webpack_require__(77).indexOf;
var hiddenKeys = __webpack_require__(36);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(14);
var toLength = __webpack_require__(12);
var toAbsoluteIndex = __webpack_require__(58);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var definePropertyModule = __webpack_require__(7);
var anObject = __webpack_require__(9);
var objectKeys = __webpack_require__(45);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(14);
var nativeGetOwnPropertyNames = __webpack_require__(44).f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(75);
var has = __webpack_require__(8);
var wrappedWellKnownSymbolModule = __webpack_require__(81);
var defineProperty = __webpack_require__(7).f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var isArray = __webpack_require__(62);
var wellKnownSymbol = __webpack_require__(3);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(64);
var hide = __webpack_require__(10);
var has = __webpack_require__(8);
var wellKnownSymbol = __webpack_require__(3);
var IS_PURE = __webpack_require__(41);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var aPossiblePrototype = __webpack_require__(118);

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(58);
var toInteger = __webpack_require__(37);
var toLength = __webpack_require__(12);
var toObject = __webpack_require__(13);
var arraySpeciesCreate = __webpack_require__(83);
var createProperty = __webpack_require__(65);
var arrayMethodHasSpeciesSupport = __webpack_require__(49);

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(11);

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var setPrototypeOf = __webpack_require__(86);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var fails = __webpack_require__(2);
var toObject = __webpack_require__(13);
var nativeGetPrototypeOf = __webpack_require__(64);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(85);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var classofRaw = __webpack_require__(26);
var wellKnownSymbol = __webpack_require__(3);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);
var requireObjectCoercible = __webpack_require__(27);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 93 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var fails = __webpack_require__(2);
var nativeGetOwnPropertyNames = __webpack_require__(80).f;

var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var exec = __webpack_require__(52);

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(9);

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var classof = __webpack_require__(26);
var wellKnownSymbol = __webpack_require__(3);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(133);
var isRegExp = __webpack_require__(97);
var anObject = __webpack_require__(9);
var requireObjectCoercible = __webpack_require__(27);
var speciesConstructor = __webpack_require__(134);
var advanceStringIndex = __webpack_require__(135);
var toLength = __webpack_require__(12);
var callRegExpExec = __webpack_require__(136);
var regexpExec = __webpack_require__(52);
var fails = __webpack_require__(2);

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var forEach = __webpack_require__(100);

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(28).forEach;
var sloppyArrayMethod = __webpack_require__(16);

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var from = __webpack_require__(137);
var checkCorrectnessOfIteration = __webpack_require__(105);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);
var Iterators = __webpack_require__(39);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(91);
var Iterators = __webpack_require__(39);
var wellKnownSymbol = __webpack_require__(3);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var DOMIterables = __webpack_require__(93);
var forEach = __webpack_require__(100);
var hide = __webpack_require__(10);

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    hide(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(2);

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var isArrayIteratorMethod = __webpack_require__(103);
var toLength = __webpack_require__(12);
var bind = __webpack_require__(47);
var getIteratorMethod = __webpack_require__(104);
var callWithSafeIterationClosing = __webpack_require__(102);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  while (!(step = iterator.next()).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(111);


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _mutableMarker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68);
/* harmony import */ var _mutableIcon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);



L.Marker.Mutable = _mutableMarker_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"];
L.Icon.Mutable = _mutableIcon_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"];
L.utils = {
  load: _utils_index_js__WEBPACK_IMPORTED_MODULE_2__[/* load */ "g"],
  createMutableIconClass: _utils_index_js__WEBPACK_IMPORTED_MODULE_2__[/* createMutableIconClass */ "c"],
  Converter: _utils_index_js__WEBPACK_IMPORTED_MODULE_2__[/* Converter */ "a"],
  grayFilter: _utils_index_js__WEBPACK_IMPORTED_MODULE_2__[/* grayFilter */ "f"],
  noFilteredIconCluster: _utils_index_js__WEBPACK_IMPORTED_MODULE_2__[/* noFilteredIconCluster */ "h"]
};
/* harmony default export */ __webpack_exports__["default"] = (_mutableMarker_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(30)))

/***/ }),
/* 112 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var nativeFunctionToString = __webpack_require__(73);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(57);
var getOwnPropertyNamesModule = __webpack_require__(44);
var getOwnPropertySymbolsModule = __webpack_require__(60);
var anObject = __webpack_require__(9);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(57);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);
var create = __webpack_require__(38);
var hide = __webpack_require__(10);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  hide(ArrayPrototype, UNSCOPABLES, create(null));
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(84).IteratorPrototype;
var create = __webpack_require__(38);
var createPropertyDescriptor = __webpack_require__(31);
var setToStringTag = __webpack_require__(46);
var Iterators = __webpack_require__(39);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var isObject = __webpack_require__(6);
var isArray = __webpack_require__(62);
var toAbsoluteIndex = __webpack_require__(58);
var toLength = __webpack_require__(12);
var toIndexedObject = __webpack_require__(14);
var createProperty = __webpack_require__(65);
var arrayMethodHasSpeciesSupport = __webpack_require__(49);
var wellKnownSymbol = __webpack_require__(3);

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var aFunction = __webpack_require__(48);
var toObject = __webpack_require__(13);
var fails = __webpack_require__(2);
var sloppyArrayMethod = __webpack_require__(16);

var nativeSort = [].sort;
var test = [1, 2, 3];

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var SLOPPY_METHOD = sloppyArrayMethod('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(5);
var defineProperty = __webpack_require__(7).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var global = __webpack_require__(4);
var isForced = __webpack_require__(61);
var redefine = __webpack_require__(11);
var has = __webpack_require__(8);
var classof = __webpack_require__(26);
var inheritIfRequired = __webpack_require__(89);
var toPrimitive = __webpack_require__(33);
var fails = __webpack_require__(2);
var create = __webpack_require__(38);
var getOwnPropertyNames = __webpack_require__(44).f;
var getOwnPropertyDescriptor = __webpack_require__(40).f;
var defineProperty = __webpack_require__(7).f;
var trim = __webpack_require__(123).trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(27);
var whitespaces = __webpack_require__(124);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),
/* 124 */
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(5);
var fails = __webpack_require__(2);
var objectKeys = __webpack_require__(45);
var getOwnPropertySymbolsModule = __webpack_require__(60);
var propertyIsEnumerableModule = __webpack_require__(55);
var toObject = __webpack_require__(13);
var IndexedObject = __webpack_require__(32);

var nativeAssign = Object.assign;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !nativeAssign || fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(91);
var wellKnownSymbol = __webpack_require__(3);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = String(test) !== '[object z]' ? function toString() {
  return '[object ' + classof(this) + ']';
} : test.toString;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var IndexedObject = __webpack_require__(32);
var toIndexedObject = __webpack_require__(14);
var sloppyArrayMethod = __webpack_require__(16);

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var SLOPPY_METHOD = sloppyArrayMethod('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $reduce = __webpack_require__(129).left;
var sloppyArrayMethod = __webpack_require__(16);

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: sloppyArrayMethod('reduce') }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(48);
var toObject = __webpack_require__(13);
var IndexedObject = __webpack_require__(32);
var toLength = __webpack_require__(12);

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var toLength = __webpack_require__(12);
var notARegExp = __webpack_require__(131);
var requireObjectCoercible = __webpack_require__(27);
var correctIsRegExpLogic = __webpack_require__(132);

var nativeEndsWith = ''.endsWith;
var min = Math.min;

// `String.prototype.endsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('endsWith') }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = String(searchString);
    return nativeEndsWith
      ? nativeEndsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__(97);

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(3);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(10);
var redefine = __webpack_require__(11);
var fails = __webpack_require__(2);
var wellKnownSymbol = __webpack_require__(3);
var regexpExec = __webpack_require__(52);

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
  }
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var aFunction = __webpack_require__(48);
var wellKnownSymbol = __webpack_require__(3);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(92).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(26);
var regexpExec = __webpack_require__(52);

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(47);
var toObject = __webpack_require__(13);
var callWithSafeIterationClosing = __webpack_require__(102);
var isArrayIteratorMethod = __webpack_require__(103);
var toLength = __webpack_require__(12);
var createProperty = __webpack_require__(65);
var getIteratorMethod = __webpack_require__(104);

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var index = 0;
  var iteratorMethod = getIteratorMethod(O);
  var length, result, step, iterator;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    result = new C();
    for (;!(step = iterator.next()).done; index++) {
      createProperty(result, index, mapping
        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
        : step.value
      );
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
    }
  }
  result.length = index;
  return result;
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $every = __webpack_require__(28).every;
var sloppyArrayMethod = __webpack_require__(16);

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: sloppyArrayMethod('every') }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var isObject = __webpack_require__(6);
var onFreeze = __webpack_require__(67).onFreeze;
var FREEZING = __webpack_require__(107);
var fails = __webpack_require__(2);

var nativeSeal = Object.seal;
var FAILS_ON_PRIMITIVES = fails(function () { nativeSeal(1); });

// `Object.seal` method
// https://tc39.github.io/ecma262/#sec-object.seal
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  seal: function seal(it) {
    return nativeSeal && isObject(it) ? nativeSeal(onFreeze(it)) : it;
  }
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(141);
var collectionStrong = __webpack_require__(142);

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = collection('Set', function (get) {
  return function Set() { return get(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var global = __webpack_require__(4);
var isForced = __webpack_require__(61);
var redefine = __webpack_require__(11);
var InternalMetadataModule = __webpack_require__(67);
var iterate = __webpack_require__(108);
var anInstance = __webpack_require__(109);
var isObject = __webpack_require__(6);
var fails = __webpack_require__(2);
var checkCorrectnessOfIteration = __webpack_require__(105);
var setToStringTag = __webpack_require__(46);
var inheritIfRequired = __webpack_require__(89);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(7).f;
var create = __webpack_require__(38);
var redefineAll = __webpack_require__(143);
var bind = __webpack_require__(47);
var anInstance = __webpack_require__(109);
var iterate = __webpack_require__(108);
var defineIterator = __webpack_require__(63);
var setSpecies = __webpack_require__(144);
var DESCRIPTORS = __webpack_require__(5);
var fastKey = __webpack_require__(67).fastKey;
var InternalStateModule = __webpack_require__(35);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(11);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(57);
var definePropertyModule = __webpack_require__(7);
var wellKnownSymbol = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(5);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
var lastIndexOf = __webpack_require__(146);

// `Array.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(14);
var toInteger = __webpack_require__(37);
var toLength = __webpack_require__(12);
var sloppyArrayMethod = __webpack_require__(16);

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('lastIndexOf');

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = (NEGATIVE_ZERO || SLOPPY_METHOD) ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(0);
var $some = __webpack_require__(28).some;
var sloppyArrayMethod = __webpack_require__(16);

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: sloppyArrayMethod('some') }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(11);
var anObject = __webpack_require__(9);
var fails = __webpack_require__(2);
var flags = __webpack_require__(96);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ })
/******/ ])["default"];
});