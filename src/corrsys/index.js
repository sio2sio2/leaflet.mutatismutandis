import Correctable from "./correctable.js";
import {getProperty, equals} from "../utils/index.js";

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
CorrSys.prototype.register = function(name, obj) {
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
   const sc = this[obj.attr] = this[obj.attr] || {};
   if(sc.hasOwnProperty(name)) {
      console.warn(`${name}: La corrección ya está registrada`);
      return false;
   }
   // Apuntamos en una propiedad de la función, el nombre de la corrección,
   // si es aditiva, y con qué opciones se ha aplicado.
   obj.func.prop = {
      name: name,
      add: obj.add,
      apply: obj.apply || equals,  // Issue #58
      default_auto: obj.autochain || false,  // Issue #39
      params: null,  // Issue #23.
      // Issue #37
      chain: obj.chain || [],  // Correcciones que aplica automáticamente esta corrección
      chain_params: {}  // key: eslabones previos de la cadena de correcciones.
                        // value: las opciones de corrección
      // Fin issue # 37
   }
   sc[name] = obj.func;
   return this;
}

// Issue #58
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
CorrSys.prototype.isApplied = function(name, params, type) {
   const opts = this.getOptions(name);
         
   let a_params = [] 

   if(type !== "auto" && opts.params) a_params.push(opts.params);
   if(type !== "manual") {
      let params = this.getAutoParams(name);
      params = Object.keys(params).map(c => params[c]);
      a_params.push.apply(a_params, params);
   }

   for(const oldparams of a_params) {
      if(opts.apply(oldparams, params)) return true;
   }
   return false;
}
// Fin issue #58

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
CorrSys.prototype._normalizeName = function(name, prename) {
   const lastSpace = name.lastIndexOf(" ");
   if(lastSpace === -1) return prename?["", name]:name;
   else {
      const res = name.substring(lastSpace+1);
      return prename?[name.substring(0, lastSpace), res]:res;
   }
}
// Fin #issue 37

/**
 * Informa de si la propiedad de una marca es corregible.
 * @method CorrSys.prototype.isCorrectable
 *
 * @param {String} attr     Nombre de la propiedad que se quiere investigar. Es admisible
 *    la notación de punto para propiedades anidadas.
 * @param {Marker} marker Marca donde se encuentra la propiedad
 * @returns {?Correctable}   La propia propiedad si es corregible, o nulo.
 */
CorrSys.prototype.isCorrectable = function(attr, marker) {
   const arr = getProperty(marker.getData(), attr);
   if(arr && arr.correctable) return arr.correctable;
   else null;
}


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
CorrSys.prototype.getCorrections = function(attr) {
   if(attr) return this[attr] || null;
   else {
      const res = {};
      for(const attr in this) Object.assign(res, this[attr]);
      return res;
   }
}

/**
 * Devuelve el nombre de todas las correcciones aplicadas
 * manualmente y las opciones con las que se aplican.
 *
 * @returns {Object} Un objeto cuyas claves son los nombres
 * de las correcciones aplicadas y cuyos valores son las opciones.
 */
CorrSys.prototype.getAppliedCorrections = function() {
   const ret = {},
         corrs = this.getCorrections();

   for(const name in corrs) {
      const opts = corrs[name].prop;
      if(!opts.params) continue;
      ret[name] = opts;
   }

   return ret;
}

/**
 * Devuelve las propiedades corregibles.
 * @method CorrSys#list
 *
 * @returns {Array.<String>}
 */
CorrSys.prototype.list = function() {
   return Object.keys(this);
} 

/**
 * Prepara un objeto convirtiendo los arrays en Correctables.
 * @method CorrSys#prepare
 *
 * @param {Object} obj  El objeto que sufrirá el cambio.
 * @param {String} prop Un array concreto del objeto que se quiere convertir
 *    en Correctable. Si no se especifica, se buscan todos para los
 *    que se hayan definido al menos una corrección.
 */
CorrSys.prototype.prepare = function(obj, prop) {
   const attrs = (prop === undefined)?this.list():[prop];
   for(let attr of attrs) {
      let o, name;
      const idx = attr.lastIndexOf(".");

      if(idx === -1) {
         o = obj;
         name = attr;
      }
      else {
         o = getProperty(obj, attr.substring(0, idx));
         if(o === undefined) {
            console.error("El objeto carece de la propiedad " + attr.substring(0, idx));
            continue
         }
         name = attr.substring(idx+1);
      }
      // Consideraremos que si falta el atributo, es un array vacío)
      if(o[name] === undefined) o[name] = [];
      if(!(o[name] instanceof Array)) {
         console.error("La propiedad no es un Array");
         continue
      }
      const correctable = new Correctable(o[name], this);
      // Issue #B.2
      Object.defineProperty(o, name, {
         get: () => {
            const ret = Array.from(correctable).filter(e => e.filters.length === 0).map(e => e.value);
            ret.correctable = correctable;
            return ret;
         }
      });
      // Fin #B.2
   }
}

/**
 * Devuelve la propiedad de los datos que corrige la corrección.
 * @method CorrSys#getProp
 *
 * @param {string} name  Nombre de la corrección
 *
 * @returns {string} El nombre de la propiedad en notación de punto.
 */
CorrSys.prototype.getProp = function(name) {
   name = this._normalizeName(name);
   for(const prop in this) {
      if(this[prop].hasOwnProperty(name)) return prop;
   }
}

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
CorrSys.prototype.getOptions = function(name) {
   let ret, prename;
   [prename, name] = this._normalizeName(name, true);

   const property = this.getProp(name);
   if(!property) throw new Error(`${name}: corrección no registrada`);
   const sc = this[property];

   ret = {attr: property, func: sc[name]}
   Object.assign(ret, ret.func.prop);

   if(prename) {
      ret.params = ret.chain_params[prename];
      ret.prename = prename;
   }
   delete ret.chain_params;

   return ret;
}

/**
 * Establece unas nuevas opciones de aplicación de una determinada corrección.
 * @method CorrSys#setParams
 *
 * @params {String} name   Nombre de la corrección.
 * @params {Object} opts   Opciones de aplicación de la corrección.
 *
 * @returns {Object}   Las propias opciones.
 */
CorrSys.prototype.setParams = function(name, opts) {
   const sc = this[this.getProp(name)];
   if(!sc) throw new Error(`${name}: corrección no registrada`);

   let [prename, postname] = this._normalizeName(name, true);

   if(prename) {
      if(opts !== null) sc[postname].prop.chain_params[prename] = opts;
      else delete sc[postname].prop.chain_params[prename];
   }
   else sc[name].prop.params = opts;

   // Si se borran los opciones de corrección (se fijan a null), se deben
   // borrar recursivamente las opciones calculadas del resto de la cadena.
   // Issue #60: o si se fijan unas nuevas opciones manuales, resetear las calculadas.
   if(opts === null || !prename) {
      for(const chain of sc[postname].prop.chain) {
         if(this.looped(name, chain.corr)) continue;
         this.setParams(postname + " " + chain.corr, null);
      }
   }

   return opts;
}
// Fin issue #23

/**
 * Resetea el objeto.
 *
 * @param {Boolean} deep  Si ``true``, elimina del sistema las correcciones;
 *    de lo contrario, sólo las marca como desaplicadas.
 */
CorrSys.prototype.reset = function(deep) {
   if(deep) for(const prop in this) delete this[prop];
   else {
      const corrs = this.getCorrections();
      for(const name in corrs) this.setParams(name, null);
   }
   return this;
}


/**
 * Inicializa la corrección, fijando las opciones y si se deben
 * aplicar automáticamente las correcciones definidas en su cadena.
 * @params {String} name  El nombre de la corrección.
 * @params {Object} opts  Opciones de corrección.
 * @params {Boolean} auto Si ``true``, se aplicaráb las correciones de la cadena.
 *
 * @returns {CorrSys} El propio objeto.
 */
CorrSys.prototype.initialize = function(name, opts, auto) {
   this.setParams(name, opts);
   const sc = this[this.getProp(name)];
   try {
      sc[name].prop.auto = sc[name].prop.default_auto;  // Issue #39
      if(auto !== undefined) sc[name].prop.auto = !!auto;
   }
   catch(error) {
      console.warn("¿Está intentando inicializar una corrección encadenada?");
      throw error;
   }

   return this;
}

/**
 * Comprueba si la cadena forma un bucle
 *
 * @param {String}  chain  Los nombres de las correcciones que forman la cadena.
 * @oaram {?String} name   La nueva corrección que se desea añadir a la cadena.
 * Si no se define, se entenderá que *chain* ya lo incorpora.
 *
 * @returns {Boolean} ``true``, si se forma bucle.
 */
CorrSys.prototype.looped = function(chain, name) {
   chain = chain.split(" ");
   if(!name) name = chain.pop();

   return chain.indexOf(name) !== -1;
}

/**
 * Devuelve todos las opciones con las que se ha aplicado automáticamente
 * una corrección.
 * 
 * @param {String} name  El nombre de la corrección.
 *
 * @returns {Object}  Un objeto en que las claves son las correcciones originales
 * que provocaron las correcciones y los valores las opciones de corrección.
 */
CorrSys.prototype.getAutoParams = function(name) {
   const sc = this[this.getProp(name)];
   if(!sc) throw new Error(`${name}: corrección no registrada`);

   name = this._normalizeName(name);
   const params = sc[name].prop.chain_params;

   let res = {};
   for(const n in params) {
      res[this.getOriginal(n)] = params[n];
   }
   return res;
}

/**
 * Devuelve la correccion original que desencadenó
 * la corrección que se consulta.
 *
 * @param {String} name  El nombre de la corrección.
 *
 * @returns {String} La corrección que originariamente
 * desencadenó la corrección suministrada.
 */
CorrSys.prototype.getOriginal = function(name) {
   const idx = name.indexOf(" ");
   return idx === -1?name:name.substring(0, idx);
}
// Fin issue #37

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
CorrSys.prototype.getAutoCorrs = function(name, ret) {
   ret = ret || {}; 

   const sc = this[this.getProp(name)];
   if(!sc) throw new Error(`${name}: corrección no registrada`);

   let [prename, postname] = this._normalizeName(name, true);

   if(prename) {
      const opts = sc[postname].prop.chain_params[prename];
      if(opts) ret[postname] = opts;
   }
   else ret[name] = sc[name].prop.params;

   for(const chain of sc[postname].prop.chain) {
      if(this.looped(name, chain.corr)) continue;
      this.getAutoCorrs(name + " " + chain.corr, ret);
   }

   return ret;
}

export default CorrSys;
