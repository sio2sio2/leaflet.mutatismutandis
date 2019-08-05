// Crea un grupo de controles que permiten
// eliminar o reponer datos del mapa. Por
// ejemplos cada una de las instalaciones posibles.
function crearGrupo(corr, opts) {
   const container = L.DomUtil.get("controlbar"),
         group = container.querySelector("template").content.firstElementChild.cloneNode(true),
         itemDiv = group.querySelector("template").content.firstElementChild;

   itemDiv.remove();
   group.querySelector("legend").textContent = opts.titulo;
   group.id = corr.replace(":", "_");

   for(const item of opts.items) {
      group.appendChild(crearItem(corr, itemDiv.cloneNode(true),
                                  opts.field, item.leyenda, item.value, opts.auto));
   }

   // Al aplicar la corrección se marcan y desmarcan
   // los controles correspondientes: útil si se aplica desde la consola.
   Gym.on(corr, e => {
      const [action, name] = corr.split(":"),
            inputs = Array.from(group.querySelectorAll("input")),
            values = e.opts[opts.field],
            inv = e.opts.inv;

      inputs.forEach(i => i.checked = !!(inv ^ values.includes(i.value)));
   });

   // Al desaplicar la corrección, deben desmarcarse
   // todos los controles correspondientes: útil si se aplica desde la consola.
   Gym.on(`un${corr}`, e => {
      const [action, name] = corr.split(":"),
            inputs = Array.from(group.querySelectorAll("input"));

      inputs.forEach(i => i.checked = false);
   });

   return group;
}


// Añade a la página un ítem del grupo. Por ejemplo,
// si se trata de instalaciones, añadir/eliminar la piscina.
function crearItem(id, div, field, legend, value, auto) {
   const input = div.querySelector("input"),
         iden = `${id.replace(":", "_")}_${value}`;

   div.querySelector("label").textContent = legend;
   div.querySelector("input").name = id;
   div.querySelector("input").id = iden;
   div.querySelector("input").value = value;
   div.querySelectorAll("label").forEach(label => label.setAttribute("for", iden));

   // Al (des)marcar un ítem, se aplica la correción
   // con todos los ítem del grupo marcados.
   input.addEventListener("change", e => {
      const [action, name] = id.split(":"),
            values = getValues(e.target);

      if(values.length) Gym[action](name, {[field]: values}, auto);
      else  Gym[`un${action}`](name);

      Gym.invoke("refresh");
   });

   return div;
}


// Lista de ítem marcados.
function getValues(input) {
   const section = input.closest("form");

   return Array.from(section.querySelectorAll("input"))
                    .filter(i => i.checked).map(i => i.value);
}


const inst = [
   {
      leyenda: "Sala de musculación",
      value: "musculación"
   },
   {
      leyenda: "Sala diáfana",
      value: "diáfana"
   },
   {
      leyenda: "Sauna",
      value: "sauna"
   },
   {
      leyenda: "Piscina",
      value: "piscina"
   }
];


const act = [
   {
      leyenda: "Musculación libre",
      value: "mlibre"
   },
   {
      leyenda: "Musculación guiada",
      value: "mguiada"
   },
   {
      leyenda: "Zumba",
      value: "zumba"
   },
   {
      leyenda: "Pilates",
      value: "pilates"
   },
   {
      leyenda: "Yoga",
      value: "yoga"
   },
   {
      leyenda: "Nado libre",
      value: "nlibre"
   },
   {
      leyenda: "Nado guiado",
      value: "nguiada"
   }
]
