function crearMarca(layer) {
   return L.Marker.Mutable.extend({
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
      }
   });

   this.register("actividades", {
      attr: "actividades",
      // opts: {act: ["nlibre", "mlibre"], inv: true}
      func: function(idx, act, opts) {
         return !!(opts.inv ^ opts.act.includes(act[idx]));
      }
   });
}


function crearControles() {
   const container = L.DomUtil.get("controlbar");
   // Podríamos hacer otro tanto con las actividades.
   container.appendChild(crearGrupo("correct:instalaciones", {
      titulo: "Desechar instalaciones",
      field: "inst",
      items: inst
   }));
}
