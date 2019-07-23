import Value from "./value.js";

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
const Prototype = {
   /**
    * Devuelve las correcciones que han eliminado el elemento idx del array.
    *
    * @param {int} idx Índice del elemento que se quiere consultar.
    * @returns {Array} Array con los nombres
    */
   filters: function(idx) {
      return Object.keys(this.corr).filter(n => this.corr[n][idx])
                                   .map(c => this._sc.getOriginal(c));
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
   apply: function(marker, name) {
      const opts = this._sc.getOptions(name);

      if(opts.add) {
         // La corrección ya estaba aplicada: la desaplicamos.
         if(this.corr.hasOwnProperty(name)) this.unapply(name);

         const values = opts.func.call(marker, null, this, opts.params);
         let num = values.length;
         if(num === 0) return false;
         Array.prototype.push.apply(Object.getPrototypeOf(this), values);

         this.corr[name] = new Array(this.length);
         for(let i=this.length-num; i<this.length; i++) this.corr[name][i] = null;
         this._count = undefined;

         // Las correcciones que eliminan valores,
         // pueden eliminar los valores añadidos.
         for(const n in this.corr) {
            const opts = this._sc.getOptions(n);

            this.corr[n].length = this.length;
            if(opts.add) continue;  // Es una corrección que añade valores.

            for(let i=this.length-num; i<this.length; i++) {
               this.corr[n][i] = opts.func.call(marker, i, this, opts.params);
            }
         }

         return true;
      }
      else {
         let ret = false;
         if(!this.corr.hasOwnProperty(name)) this.corr[name] = new Array(this.length);

         for(let i=0; i<this.length; i++) {
            const prev = this.corr[name][i];
            this.corr[name][i] = opts.func.call(marker, i, this, opts.params);
            if(prev ^ this.corr[name][i]) ret = true;  // La corrección cambia sus efectos.
         }

         if(ret) this._count = undefined;
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
   unapply: function(name) {
      const opts = this._sc.getOptions(name);

      if(opts.add) {
         if(!this.corr.hasOwnProperty(name)) return false; // No se había aplicado.
         const arr = this.corr[name];
         delete this.corr[name];
         let a, b;
         for(let i=0; i<arr.length; i++) {
            if(arr[i] === null) {
               if(a === undefined) a=i;
            }
            else if(a !== undefined) {
               b=i;
               break;
            }
         }
         if(a === undefined) return false;
         if(b === undefined) b = arr.length;
         this._count = undefined;
         // Eliminamos los valores al array añadidos por esta corrección
         Object.getPrototypeOf(this).splice(a, b-a);
         for(const name in this.corr) this.corr[name].splice(a, b-a);
      }
      else {
         if(!this.corr.hasOwnProperty(name)) return false; // No se había aplicado.
         const arr = this.corr[name];
         delete this.corr[name];
         if(arr.some(e => e)) this._count = undefined;
         else return false;
      }

      return true;
   },
   /**
    * Limpia el array de todas las correcciones.
    */
   clear: function() {
      // Primer elemento que tiene un null (o sea, no formaba parte del array original.
      const idx = Math.min.apply(null, Object.keys(this.corr).map(k => this.corr[k].indexOf(null)).filter(e => e >= 0));
      this.length = idx;
      for(const name in Object.getOwnPropertyNames(this.corr)) delete this.corr[name];
   }
}


// Total de elementos excluyendo los eliminados por correcciones.
function total() {
   if(this._count !== undefined) return this._count;
   this._count = 0;
   for(let i=0; i<this.length; i++) {
      if(this.filters(i).length === 0) this._count++;
   }
   return this._count;
}


/**
 * Iterador que genera un objeto Value para cada elemento del array
 * a fin de que se pueda saber si el valor está o no filtrado.
 * @generator
 */
function* iterator() {
   for(let i=0; i<this.length; i++) {
      yield new Value(this[i], this.filters(i));
   }
}


export default function(arr, sc) {
   if(!(arr instanceof Array)) throw new TypeError("El objeto no es un array");
   const obj = Object.assign(Object.create(arr), Prototype);
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
         configurable: false,
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
      },
   });

   obj[Symbol.iterator] = iterator;

   return obj;
}
