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
         return this.getData().actividades.length < opts.min;
      }
   });

   this.registerF("instmin", {
      attrs: "inst",
      // {opts: {min: 1}}
      func: function(opts) {
         return this.getData().inst.length < opts.min;
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

   Array.from(document.getElementById("filterbar").content.children)
             .forEach(e => container.appendChild(e));
   document.getElementById("filterbar").remove();

   container.lastChild.id = "filterbar";

   container.lastChild.appendChild(crearFiltro("filter:actmin", {
      titulo: "Eliminar gimnasios sin actividad",
      opts: {min: 1}
   }));

   container.lastChild.appendChild(crearFiltro("filter:instmin", {
      titulo: "Eliminar gimnasios sin instalación",
      opts: {min: 1}
   }));
}


function crearFiltro(name, opts) {
   const template = document.getElementById("filterbar").firstElementChild.content,
         item = template.firstElementChild.cloneNode(true),
         input = item.querySelector("input"),
         id = name.replace(":", "_");

   item.querySelector("input").name = name;
   item.querySelector("input").id = id;
   item.querySelector("label").textContent = opts.titulo;
   item.querySelector("input").value = JSON.stringify(opts.opts);
   item.querySelectorAll("label").forEach(label => label.setAttribute("for", id));

   // Al (des)marcar un ítem, se (des)aplica el filtro
   // tomando las opciones contenidas en value.
   input.addEventListener("change", e => {
      const name = e.target.name.split(":")[1];

      if(e.target.checked) Gym.filter(name, JSON.parse(e.target.value));
      else Gym.unfilter(name);

      Gym.invoke("refresh");
   });

   return item;
}
