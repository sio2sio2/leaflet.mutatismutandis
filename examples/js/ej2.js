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
   const container = L.DomUtil.get("controlbar").firstElementChild,
         template = container.querySelector("template").content.firstElementChild;

   function crearOpcion(id, legend, opts) {
      const item = template.cloneNode(true),
            input = item.querySelector("input");

      item.querySelector("label").textContent = legend;
      item.querySelector("input").name = id;
      item.querySelector("input").id = id;
      item.querySelector("input").value = JSON.stringify(opts);
      item.getElementsByTagName("label").forEach(label => label.setAttribute("for", id));

      // En realidad, habría que comprobar si e.opts coincide con opts.
      Gym.on(id, e => input.checked = true);
      Gym.on(`un${id}`, e => input.checked = false);

      input.addEventListener("change", e => {
         const [action, name] = id.split(":");

         if(e.target.checked) Gym[action](name, opts);
         else Gym[`un${action}`](name);

         Gym.invoke("refresh");
      });
      

      return item;
   }

   container.appendChild(crearOpcion("correct:actividades", "Desechar pilates y zumba", {act: ["pilates", "zumba"]}));
   container.appendChild(crearOpcion("correct:instalaciones", "Desechar musculación", {inst: ["musculación"]}));
}
