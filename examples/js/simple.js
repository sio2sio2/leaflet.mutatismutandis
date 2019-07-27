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
