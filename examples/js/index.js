window.onload = function() {
   "use strict";

   // Mapa y obtención de la cartografía.
   const map = L.map("map").setView([37.390, -5.985], 15);
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       maxZoom: 18
   }).addTo(map);

   // Capa a la que se agregan los gimnasios.
   const layer = L.geoJSON(null, {
      pointToLayer: (f, p) => new Gym(p, {
         icon: new Icono(),
         title: f.properties.name,
      }),
      // A efectos de depuración
      onEachFeature: (f, l) => {
         l.on("click", e => {
            console.log("DEBUG", e.target.getData().name);
            console.log("DEBUG", e.target.getData());
         });
      }
   }).addTo(map);

   // Se crea la plantilla.
   const Icono = crearIcono(),
         Gym = crearMarca(layer);
   
   // Carga del JSON con los datos.
   L.utils.load({
      url: "files/gym.json",
      callback: xhr => {
         const datos = JSON.parse(xhr.responseText);
         Icono.onready(() => layer.addData(datos));
         window.general = datos.features[0].properties;
      }
   });

   // Filtros y correcciones.
   agregarExtras.call(Gym);

   window.Gym = Gym;
}

function crearIcono() {
   const len = x => x.total === undefined?x.length:x.total;
   // Define cómo se convierten los datos
   // en las opciones de dibujo.
   const converter = new L.utils.Converter(["piscina", "numact"])
                                .define("numact", "actividades", a => len(a))
                                .define("piscina", "inst", i => i.includes("piscina"));

   // Cómo se actualiza la plantilla en función
   // de las opciones de dibujo
   function updater(o) {
      const content = this.querySelector(".content");
      switch(o.piscina) {
         case undefined:
            break;
         default:
            if(o.piscina) content.classList.add("piscina");
            else content.classList.remove("piscina");
      }
      if(o.numact !== undefined) {
         content.firstElementChild.textContent = o.numact;
      }
   }

   return L.utils.createMutableIconClass("chupachups", {
      iconSize: [25, 34],
      iconAnchor: [12.5, 34],
      html: document.querySelector("template").content,
      css: "images/chupachups.css",
      converter: converter,
      updater: updater
   });
}
