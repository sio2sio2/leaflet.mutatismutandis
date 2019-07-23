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
      value: typeof value !== "object" || value === null,
      writable: false,
      configurable: false,
      enumerable: false
   });
   if(this.isPrimitive()) this.value = value;
   else {
      if(value.filters !== undefined) console.warn("El valor original del array posee un atributo filters y se perderá");
      Object.assign(this, value);
   }
   Object.defineProperty(this, "filters", {
      value: filters,
      writable: false,
      configurable: false,
      enumerable: false
   });
}

Value.prototype.isPrimitive = function() { return this.__primitive };
Value.prototype.valueOf = function() {
   if(this.isPrimitive()) return this.value;
   else return this;
}
Value.prototype.toString = function() {
   if(this.isPrimitive()) return this.value.toString();
   else return Object.prototype.toString.call(this);
}

export default Value;
