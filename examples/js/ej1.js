function crearMarca(layer) {
   return L.MutableMarker.extend({
      options: {
         mutable: "feature.properties"
      }
   });
}

function agregarExtras() {
   console.log("No se implementa ningún extra en esta versión");
}

function crearControles() {
   const container = document.querySelector("#controlbar").firstElementChild,
         p = document.createElement("p");

   p.textContent = "No hay herramientas para afinar la búsqueda";
   container.appendChild(p);
}
