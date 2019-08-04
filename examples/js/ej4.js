function crearMarca(layer) {
   return L.MutableMarker.extend({
      options: {
         mutable: "feature.properties",
         filter: layer
      }
   });
}


function agregarExtras() {
   this.register("instalaciones", {
      attr: "inst",
      // opts: {inst: ["piscina", "sauna"], inv: true}
      func: function(idx, inst, opts) {
         return !!(opts.inv ^ opts.inst.includes(inst[idx]));
      },
      autochain: false,
      chain: [{
         corr: "actividades",
         func: function(opts) {
            const act = [];

            for(const i of opts.inst) {
               act.push.apply(act, general.tipos[i]);
            }
            return {act: act, inv: opts.inv};
         }
      }]
   });

   this.register("actividades", {
      attr: "actividades",
      // opts: {act: ["nlibre", "mlibre"], inv: true}
      func: function(idx, act, opts) {
         return !!(opts.inv ^ opts.act.includes(act[idx]));
      }
   });

   this.registerF("actmin", {
      attrs: "actividades",
      func: function(opts) {
         return this.getData().actividades.total < opts.min;
      }
   });

   this.registerF("instmin", {
      attrs: "inst",
      func: function(opts) {
         return this.getData().inst.total < opts.min;
      }
   });

   this.registerF("horario", {
      attrs: "horario",
      // {opts: {open: "7:30"}}
      func: function(opts) {
         const o = this.getData().horario[0];
         return opts.open.replace(":","") < o.replace(":","");
      }
   });
}

function crearControles() {
   const container = L.DomUtil.get("controlbar").firstElementChild;
   console.log(container);
}
