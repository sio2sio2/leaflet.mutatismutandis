window.onload = function() {
   "use strict";

   // Mapa y obtención de la cartografía.
   const map = L.map("map").setView([37.390, -5.985], 15);
   map.zoomControl.setPosition("bottomright");
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

   window.Gym = Gym;
   window.map = map;

   // Controles para el mapa
   crearBarraLateral();

   // Filtros y correcciones.
   agregarExtras.call(Gym);
}

function crearIcono() {
   // Define cómo se convierten los datos en las opciones de dibujo.
   const converter = new L.utils.Converter(["piscina", "numact"])
                                .define("numact", "actividades", a => a.length)
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


function crearBarraLateral() {
   const div = document.getElementById("map"),
         el = L.DomUtil.create("section", "leaflet-control", div);
   el.id = "sidebar";

   Array.from(document.getElementById("controlbar").content.children)
             .forEach(e => el.appendChild(e));
   document.getElementById("controlbar").remove();

   // Deshabilita los eventos del mapa al estar sobre la barra lateral
   el.addEventListener("dblclick", e => e.stopPropagation());
   el.addEventListener("contextmenu", e => e.stopPropagation());
   el.addEventListener("click", e => e.stopPropagation());
   el.addEventListener("mouseover", e => map.dragging.disable());
   el.addEventListener("mouseout", e => map.dragging.enable());
   el.addEventListener("mousewheel", e => e.stopPropagation());

   crearControles();
} 

function crearMarca(layer) {
   return L.Marker.Mutable.extend({
      options: {
         mutable: "feature.properties"
      }
   });
}

function agregarExtras() {
   console.log("No se implementa ningún extra en esta versión");
}

function crearControles() {
   const container = document.getElementById("sidebar"),
         p = document.createElement("p");

   p.textContent = "No hay herramientas para afinar la búsqueda";
   container.appendChild(p);
}


// Carga uno u otro script dependiendo de la URL.
(function() {
   function getScriptName() {
      const url  = new URL(window.location.href);
      return url.searchParams.get("num") || 1;
   }

   const num = getScriptName();
   console.log("DEBUG", num);
   if(num<2) return;

   let script = document.createElement("script");
   script.src = `js/common.js`;
   script.async = true;
   document.querySelector("head").appendChild(script);

   script = document.createElement("script");
   script.src = `js/ej${num}.js`;
   script.async = true;
   document.querySelector("head").appendChild(script);
})();
