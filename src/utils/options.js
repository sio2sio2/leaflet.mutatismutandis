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
const banned = ["updated"];

function Options(opts) {
   Object.defineProperty(this, "_updated", {
      value: new Set(Object.keys(opts)),
      writable: true,
      enumerable: false,
      configurable: false
   });

   for(const attr in opts) {
      if(banned.indexOf(attr) !== -1) throw new Error(attr + ": opción prohibida");
      defineOption.call(this, attr);
      if(opts[attr] !== undefined) this[attr] = opts[attr];
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
   if(this["_" + attr] === value) return;
   this["_" + attr] = value;
   this._updated.add(attr);
}

function getter(attr) {
   return this["_" + attr];
}

// Define la propiedad que representa una opción.
function defineOption(name) {
   Object.defineProperty(this, "_" + name, {
      value: undefined,
      writable: true,
      configurable: false,
      enumerable: false
   });
   Object.defineProperty(this, name, {
      get: () => getter.call(this, name),
      set: (value) => setter.call(this, name, value),
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
   value: function(obj) {
      for(const name in obj) {
         if(Object.keys(this).indexOf(name) === -1) continue;
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
   get: function() { return this._updated.size === 0; },
   enumerable: false,
   configurable: false
});

/**
 * Marca las opciones como actualizadas.
 * @method Options#reset
 */
Object.defineProperty(Options.prototype, "reset", {
   value: function() { this._updated.clear(); },
   writable: false,
   enumerable: false,
   configurable: false
})

/**
 * Devuelve sólo las opciones modificadas
 * @name Options#modified
 * @type {Array.<String>}
 */
Object.defineProperty(Options.prototype, "modified", {
   get: function() {
      const res = {};
      this._updated.forEach(e => res[e] = this[e]);
      return res;
   },
   enumerable: false,
   configurable: false
});

export default Options;
