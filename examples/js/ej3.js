function agregarExtras() {
   this.register("instalaciones", {
      attr: "inst",
      // opts: {inst: ["piscina", "sauna"], inv: true}
      func: function(idx, inst, opts) {
         return !!(opts.inv ^ opts.inst.includes(inst[idx]));
      },
      apply: (o, n) => L.Mutable.utils.compareOpts(o, n, Object.keys(general.tipos)),
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
      },
      apply: (o, n) => L.Mutable.utils.compareOpts(o, n, {length: 7})
   });
}

function crearControles() {
   const container = L.DomUtil.get("sidebar");

   container.appendChild(crearGrupo("correct:instalaciones", {
      titulo: "Desechar instalaciones",
      field: "inst",
      items: inst,
      auto: true
   }));
   container.appendChild(crearGrupo("correct:actividades", {
      titulo: "Desechar actividades",
      field: "act",
      items: act
   }));
}
