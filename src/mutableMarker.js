import {equals, getProperty} from "./utils/index.js";
import CorrSys from "./corrsys/index.js";
import FilterSys from "./filtersys.js";

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
   const corr = this.prototype.options.corr;

   if(name) name = [name];
   else name = Object.keys(corr.getAppliedCorrections());

   const ret = [];
   for(const n of name) {
      const opts = corr.getAutoCorrs(n),
            auto2 = corr.getOptions(n).auto;
      for(const x in opts) {
         ret.push({
            name: x,
            opts: opts[x],
            auto: x === n?false:auto2
         })
      }
   }
   // Ordenamos por nombre de corrección y para una misma
   // corrección, colocamos primero la manual.
   return ret.sort((a,b) => -1*(b.name + Number(b.auto) > a.name + Number(a.auto)));
}
// Fin issue #67


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
export default L.Marker.extend({
   /** @lends L.MutableMarker.prototype */
   statics: {
      /** @lends L.MutableMarker */
      extend: function() {
         const MutableMarker = L.Marker.extend.apply(this, arguments),
               options = MutableMarker.prototype.options;

         if(!options.mutable) throw new Error("La opción 'mutable' es obligatoria");

         Object.assign(MutableMarker, L.Evented.prototype); // Issue #54
         options.corr = new CorrSys();
         /**
          * Almacena todas las marcas creadas de este tipo
          * @type {Array.<L.MutableMarker>}
          */
         Object.defineProperty(MutableMarker, "store", {
            value: [],
            configurable: false,
            enumerable: false,
            writable: false
         });

         // Issue #5
         if(options.filter) options.filter = new FilterSys(options.filter);
         Object.defineProperty(MutableMarker.prototype, "filtered", {
            get: function() { 
               if(!this.options.filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");
               return this._filtered.length > 0; 
            }
         });
         // Fin issue #5

         return MutableMarker;
      },
      /**
       * Vacía :js:attr:`L.MutableMarker.store` de marcas y marca como desaplicadas las correcciones.
       * @param {Boolean} deep  Si ``true``, también desaplica los filtros.
       */
      reset: function(deep) { 
         this.store.length = 0;
         const corrs = getCorrs.call(this);    // Issue #67
         this.prototype.options.corr.reset();  // Issue #33
         // Issue #67
         for(const c of corrs) {
            this.fire("uncorrect:*", c);
            this.fire(`uncorrect:${c.name}`, c);
         }
         // Fin issue #67
         if(deep) {
            const filters = this.getFilterStatus();  // Issue #67
            this.prototype.options.filter.reset();  // Issue #40
            // Issue #67
            for(const name in filters) {
               this.fire("unfilter:*", {name: name, opts: filters[name]});
               this.fire(`unfilter:${name}`, {name: name, opts: filters[name]});
            }
            // Fin issue #67
         }
      },
      /**
       * Elimina una marca del almacén donde se guardan
       * todos los objetos marca de una misma clase.
       *
       * @param {Marker} marker  La marca que se desea eliminar.
       * @returns {Boolean}  El éxito en la eliminación.
       */
      remove: function(marker) {
         const idx = this.store.indexOf(marker);
         if(idx === -1) return false;
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
      invoke: function (method, progress) {
         const args = Array.prototype.slice.call(arguments, 2);
         if(!progress) {
            for(const marker of this.store) {
               this.prototype[method].apply(marker, args);
            }
            return;
         }

         // Issue #90
         const started = (new Date()).getTime(),
               total = this.store.length,
               noprogress = 1000,  // Para menos de 1 segundo, no se muestra nada.
               check = 150,     // Cada 150 marcas que comprueba si se hace la suspensión.
               interval = 200,  // Tiempo de ejecución.
               delay = 50;      // Tiempo de suspensión de la ejecución.
         let   i = 0;

         const process = () => {
            const start = (new Date()).getTime();
            for(; i<total; i++) {
               if((i+1)%check === 0) {
                  const lapso = (new Date()).getTime() - start;
                  if(lapso > interval) break;
               }
               this.prototype[method].apply(this.store[i], args);
            }

            if(progress !== true) {
               const lapsoTotal = (new Date()).getTime() - started;
               if(lapsoTotal > noprogress) progress(i, total, lapsoTotal);
            }
            if(i < total) setTimeout(process, delay);
         }

         process();
         // Fin issue #90
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
      register: function() {
         return CorrSys.prototype.register.apply(this.prototype.options.corr, arguments) && this;
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
      correct: function(name, params, auto) {
         const corr = this.prototype.options.corr;
         try {
            // Si la correción ya está aplicada, sólo no se aplica en
            // caso de que se aplicara con las mismas opciones.
            if(equals(corr.getOptions(name).params, params)) return false;
         }
         catch(err) {  // La corrección no está registrada.
            return false;
         }

         corr.initialize(name, params, auto);
         for(const marker of this.store) marker.apply(name);

         // Issue #54
         const corrs = getCorrs.call(this, name);
         for(const c of corrs) {
            this.fire(`correct:*`, c);
            this.fire(`correct:${c.name}`, c);
         }
         // Fin issue #54
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
      uncorrect: function(name) {
         const corr = this.prototype.options.corr;
         try {
            // La corrección no está aplicada.
            if(!corr.getOptions(name).params) return false;
         }
         catch(err) {
            return false;  // La corrección no está registrada.
         }

         for(const marker of this.store) marker.unapply(name);
         // Issue #54
         const corrs = getCorrs.call(this, name);
         corr.setParams(name, null);
         for(const c of corrs) {
            this.fire(`uncorrect:*`, c);
            this.fire(`uncorrect:${c.name}`, c);
         }
         // Fin issue #54
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
      appliedCorrection: function(name, opts, type) {
         const corr = this.prototype.options.corr;
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
      getCorrectStatus: function(name) {
         const corr = this.prototype.options.corr,
               ret = {
                  manual: {},
                  auto: {}
               }

         let corrs = corr.getAppliedCorrections();
         for(const name in corrs) ret.manual[name] = corrs[name];

         for(const name in corr.getCorrections()) {
            const auto = corr.getAutoParams(name);
            if(Object.keys(auto).length>0) ret.auto[name] = auto;
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
      registerF: function() {
         const filter = this.prototype.options.filter;
         if(!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");

         return FilterSys.prototype.register.apply(this.prototype.options.filter, arguments) && this;
      },
      /**
       * Habilita un filtro para las marcas de una clase
       * @method Marker.filter
       *
       * @param {string} name    Nombre del filtro.
       * @param {Object} params  Opciones para el filtrado.
       */
      filter: function(name, params) {
         const filter = this.prototype.options.filter;
         if(!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");

         // El filtro no existe o ya estaba habilitado con los mismo parámetros.
         if(!filter.setParams(name, params, true)) return false;
         for(const marker of this.store) marker.applyF(name);

         this.fire("filter:*", {name: name, opts: params});  // Issue #54
         this.fire(`filter:${name}`, {name: name, opts: params});  // Issue #54
         
         return this;
      },
      /**
       * Deshabilita un filtro para las marcas de una clase
       * @method Marker.unfilter
       *
       * @param {string} name    Nombre del filtro.
       */
      unfilter: function(name) {
         const filter = this.prototype.options.filter;
         if(!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");

         const params = filter.getParams(name);  // Issue #54

         if(!filter.disable(name)) return false;  // El filtro no existe o está deshabilitado.
         for(const marker of this.store) marker.unapplyF(name);

         // #Issue #54
         this.fire("unfilter:*", {name: name, opts: params});  // Issue #54
         this.fire(`unfilter:${name}`, {name: name, opts: params});  // Issue #54
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
      setFilterStyle: function(style) {
         const filter = this.prototype.options.filter;
         if(!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");

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
      hasFilter: function(name) {
         const filter = this.prototype.options.filter;
         if(!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");

         return filter.getFilters().indexOf(name) !== -1
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
      getFilterStatus: function(name) {
         const filter = this.prototype.options.filter;
         if(!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filter al crear la clase de marca?");

         if(name) return filter.getParams(name);

         const ret = {};
         for(const name of filter.getFilters()) {
            ret[name] =  filter.getParams(name);
         }
         return ret;
      }
      // Fin issue #5
   },
   /**
    * Informa de si la marca se encuentra en el ``store``
    * del tipo de marca con la que se creó.
    */
   _belongsTo: function() {
      const store = Object.getPrototypeOf(this).constructor.store;
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
   refresh: function(force) {
      let div = this.getElement();
      // Issue #5
      const filter = this.options.filter;
      if(filter) {
         if(filter.hideable) {
            if(this.filtered) {
               // Si la capa es MarkerClusterGroup. la marca puede estar
     // en la capa, aunque no se esté en el mapa.
               filter.transform.removeLayer(this);
               div = undefined;
            }
            else {
               // Debe comprobarse si la marca sigue estando
               // en el ``store``, para evitar que el refresco añada
               // a la capa una marca que ya se desechó con un .reset().
               if(!div && this._belongsTo()) {
                  filter.transform.addLayer(this);
                  div = this.getElement();
               }
            }
         }
         else {
            if(div) filter.transform.call(div, this.filtered);
            else if(force && this._belongsTo()) {
               force.addLayer(this);
               div = this.getElement();
            }
         }
      }
      // Fin issue #5
      if(!div) return false;  // La marca no está en el mapa.
      this.options.icon.refresh();
   },
   /**
    * Wrapper para el método homónimo original. Se encarga de
    * convertir en un descriptor de acceso la propiedad a la que
    * se conectan los datos, de almacenar en :attr:`Marker.store`
    * la nueva marca, y de algunos aspectos menores más.
    */
   initialize: function() {
      L.Marker.prototype.initialize.apply(this, arguments);
      this.constructor.store.push(this);
      if(this.options.icon) this.options.icon._marker = this;
      // Issue #22
      const firstDot = this.options.mutable.indexOf(".");
      const feature = firstDot === -1?this.options.mutable:
                                      this.options.mutable.substring(0, firstDot);
      Object.defineProperty(this, "_" + feature, {
         value: undefined,
         writable: true,
         configurable: false,
         enumerable: false
      });

      Object.defineProperty(this, feature, {
         get: function() { return this["_" + feature]; },
         set: function(value) {
            this["_" + feature] = value;
            // Creamos este tipo de evento que se lanza
            // al asociar la marca a los datos.
            this.fire("dataset");
         },
         configurable: false,
         enumerable: false
      });

      // Se pasan los arrays de los datos a correctables
      // y se aplican a la nueva marca filtros y correcciones aplicados.
      this.on("dataset", function(e) {
         this._prepare();
         // Issue #5
         // Aplicamos a los nuevos datos los filtros ya aplicadas
         // a los datos de las restantes marcas de la misma clase.
         const filter = this.options.filter;
         if(filter) for(const name of filter.getFilters()) this.applyF(name);
         // Fin issue #5
         // Y los mismo con las correcciones
         const corr = this.options.corr;
         for(const name in corr.getCorrections()) {
            if(corr.getOptions(name).params) this.apply(name);
         }
      });
      // Fin issue #22

      // Issue #5
      Object.defineProperty(this, "_filtered", {
         value: [],
         writable: true,
         configurable: false,
         enumerable: false
      });
      // Fin Issue #5
   },
   /**
    * Wrapper para el método homónimo original. Se encarga de conectar
    * la marca al icono.
    */
   setIcon: function(icon) {
      icon._marker = this;
      L.Marker.prototype.setIcon.apply(this, arguments);
   },
   /**
    * Prepara los datos recién conectado a la marca. Es un método interno
    * del que hace uso, el descriptor de acceso al que se fijan los datos.
    * @private
    */
   _prepare: function() {  // Convierte Arrays en Correctables.
      const data = this.getData();
      if(data === undefined) return false;  // La marca no posee los datos.
      this.options.corr.prepare(data);
      return true;
   },
   /**
    * Actualiza el icono asociado a la marca con los datos suministrados.
    * @private
    * @param {Object] data  Los datos con los que se quiere actualizar el icono.
    */
   _updateIcon: function(data) {
      const icon = this.options.icon;
      if(icon.options.params) icon.options.params.change(icon.options.converter.run(data));
   },
   // Issue #33
   /**
    * Modifica arbitrariamente los datos asociados a la marca.
    * @param {Object} data  Datos que se quieren añadir a los datos preexistentes.
    *
    * @return {Object} El resultado de haber realizado la fusión.
    */
   changeData: function(data) {
      const ret = Object.assign(this.getData(), data);

      // Bug #92
      const filter = this.options.filter,
            attrs = Object.keys(data);

      if(filter) {
         // Aplicamos los filtros que pueden verse afectados
         // por el cambio, o sea aquellos que dependen de alguno
         // de los datos que han cambiado.
         for(const name of filter.getFilters()) {
            let depends = false;
            for(const x of filter[name].prop.depends) {
               if(attrs.indexOf(x) !== -1) {
                  depends = true;
                  break
               }
            }
            if(depends) this.applyF(name);
         }
      }
      // Fin bug #92.

      this._updateIcon(data);
      return ret;
   },
   // Fin issue #33
   /**
    * Devuelve los datos asociados a la marca.
    */
   getData: function() {  // Devuelve los datos asociados a la marca.
      return getProperty(this, this.options.mutable);
   },
   /**
    *  Aplica una corrección a la marca. No debería usarse directamente, 
    *  ya que las correcciones deben aplicarse a través de {@link Marker.correct}.
    *  @private
    *
    *  @param {String} name   Nombre de la corrección
    */
   apply: function(name) {
      const corr     = this.options.corr,
            opts     = corr.getOptions(name),
            params   = opts.params;
      let   arr, ret;
      
      // La resolución de issue #22, hace que esto ocurra sólo
      // si se registra la corrección después de haber añadido la marca.
      if(!(arr = corr.isCorrectable(opts.attr, this))) {
         corr._prepare(this.getData(), opts.attr);
         arr = getProperty(this.getData(), opts.attr);
      }

      if(ret = arr.apply(this, name)) {
         // Issue #5
         const filter = this.options.filter;
         if(filter) for(const f of filter.getFilters(opts.attr)) this.applyF(f);
         // Fin issue #5

         this._updateIcon({[opts.attr]: arr});
      }

      // Issue #37
      if(!opts.auto) return ret;
      for(const chain of opts.chain) {
         const newname = name + " " + chain.corr,
               opts = corr.getOptions(newname);
         // Es la primera vez que se aplica la corrección
         // sobre alguna de las marcas, por lo que no están calculados los parámetros
         if(opts.params === undefined) {
            if(opts.add) {
               console.warn(`${corr}: No puede ser el eslabón de una cadena porque es una corrección adictiva`);
               opts.params = corr.setParams(newname, false);
            }
            if(corr.looped(name, chain.corr)) {
               console.debug(`${corr}: Corrección ya aplicada en la cadena de correciones. Se salta para evitar refencias circulares.`);
               opts.params = corr.setParams(newname, false);
            }
            const markerClass = Object.getPrototypeOf(this).constructor;
            opts.params = corr.setParams(newname, chain.func.call(markerClass, params));
         }

         if(opts.params !== false) ret = this.apply(newname) || ret;
      }
      // Fin issue #37

      return ret;
   },
   /**
    * Elimina una corrección de la marca. No debería usarse directamente, 
    * ya que las correcciones deben eliminarse a través de :meth:`Marker#uncorrect`.
    * @private
    *
    * @param {String} name    Nombre de la corrección.
    */
   unapply: function(name) {  // Elimina la corrección.
      const corr     = this.options.corr,
            opts     = corr.getOptions(name),
            arr      = getProperty(this.getData(), opts.attr);
      let ret;

      if(ret = arr.unapply(name)) {
         // Issue #5
         const filter = this.options.filter;
         if(filter) for(const f of filter.getFilters(opts.attr)) this.applyF(f);
         // Fin issue #5

         this._updateIcon({[opts.attr]: arr});
      }

      // Issue #37
      if(!opts.auto) return ret;
      for(const chain of opts.chain) {
         const newname = name + " " + chain.corr,
               opts = corr.getOptions(newname);
         if(!opts.params) continue;  // No se aplicó.
         ret = this.unapply(newname) || ret;
      }
      // Fin issue #37

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
   applyF: function(name) {
      const filter = this.options.filter;
      if(!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filtro al crear la clase de marca?");
      const params = filter.getParams(name),
            res = filter[name].call(this, params);
      if(res) {
         if(this._filtered.indexOf(name) === -1) {
            this._filtered.push(name) 
            // Issue #56
            // El evento sólo se produce cuando un centro sin filtrar, se filtra.
            if (this._filtered.length === 1) {
               this.fire("filtered", {name: name, opts: params});
            }
            // Fin issue #56
         }
      }
      else this.unapplyF(name);
      return res;
   },
   /**
    * Elimina un filtro de la marca.No debería usarse directamente, 
    * ya que los filtros deben eliminarse a través de :meth:`Marker#unfilter`.
    * @private
    *
    * @param {String} El nombre del filtro.
    */
   unapplyF: function(name) {
      const filter = this.options.filter;
      if(!filter) throw new Error("No se ha definido filtro. ¿Se ha olvidado de incluir la opción filtro al crear la clase de marca?");
      const params = filter.getParams(name),
            idx = this._filtered.indexOf(name);
      if(idx !== -1) {
         this._filtered.splice(idx, 1);
         // Issue #56
         // El evento sólo se produce cuando un centro filtrado, deja de estarlo
         if (this._filtered.length === 0) {
            this.fire("unfiltered", {name: name, opts: params});
         }
         // Fin issue #56
      }
      return idx !== 1;
   }
   // Fin issue #5
});
