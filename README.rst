Leaflet.mutatismutandis
***********************
Es una extensión a Leaflet_ pensada para facilitar la búsqueda sobre mapas
interactivos. La idea inicial es que muestren toda la información disponible y
permitan al usuario ir sucesivamente eliminando información a su juicio no
relevante a fin de que pueda ir afinando su búsqueda.

En concreto, la extensión facilita al programador:

#. Asociar a las marcas que representan un tipo de entidad, no un icono gráfico
   invariante, sino una plantilla en que los detalles visuales dependen de los
   datos asociados a cada una de las marcas. Esto permite al usuario de un
   simple vstazo tener una idea de cuáles son los datos más significativos de
   una marca concreta sin necesidad de pinchar sobre ella para conocerlos\ [#]_.

#. Establecer criterios para eliminar del mapa aquellas marcas por cuyos datos
   resulten irrelevantes para el usuario.

#. Corregir en vivo los datos asociados a las marcas para, por lo general,
   desechar aquellos datos irrelevantes a juicio del usuario. Por supuesto, si
   la corrección afecta a datos que se habían traducido en detalles visuales,
   los iconos alteraran su aspecto para reflejar dicha corrección; y si la
   corrección supone que una marca pasa a cumplir un criterio de filtrado o a no
   hacer, la marca desaparecerá o no respectivamente.

Definiciones
============
Antes de explicar cómo usar la librería es conveniente fijar una serie de
definiciones:

Datos
   Son los datos asociados a cada marca que incluyen tanto sus coordenadas
   geográficas como otra información característica. De algunos de estos
   datos, no de todos generalmente, quedará constancia gráfica a través de
   los detalles visuales de la plantilla.

Marca
   Es la plasmación de la entidad georreferenciada sobre el mapa.

Clase (o tipo) de marca
   Todas las marcas que representan entidades de la misma naturaleza pertenecen
   a una misma clase de marca. Por ejemplo, todos los *restaurantes* son
   entidades de una misma naturaleza, así que se puede definir una clase de
   marca para representar a los *restaurantes*.

   Cada clase tiene asociado un sistema de correcciones y un sistema de filtros.

Sistema de correcciones
   Sistema que permite registrar, aplicar y revertir correcciones aplicables a
   los datos de la marca que constituyan una serie (o sea, un *array*). Por
   ejemplo, para los restaurantes se puede querer registrar su aforo para
   fumadores y para no fumadores (suponiendo que la ley lo permitiera). En ese
   caso, el aforo es una serie de dos valores y el aforo total es la suma de
   ambos. Una corrección sobre este dato puede consistir en eliminar el aforo
   para no fumadores.

Sistema de filtros
   Sistema que permite fijar criterios para hacer desaparecer (o volver a
   mostrar) marcas.

Instalación
===========
La extensión dispone de tres sabores distintos:

* ``leaflet.mutatismutandis.js``, que es la versión minimizada de la
  librería; y la apropiada en la mayor parte de los casos
* ``leaflet.mutatismutandis.bundle.js``, que es una versión minimizada que
  incluye el código de Leaflet_\ [#]_.
* ``leaflet.mutatismutandis-src.js``, que es una versión no minimizada con
  mapeos al código fuente original, lo que la hace útil en caso de que se
  quieran realizar labores de depuración.

Si se pretende usar directamente desde el **navegador**:

.. code-block:: html

   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css">
   <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"></script>
   <script src="https://unpkg.com/leaflet.mutatismutandis@1.0.0/dist/leaflet.mutatismutandis.js"></script>

Si se pretende usar para un desarrollo con NodeJS_:

.. code-block:: console

   $ npm install leaflet.mutatismutandis

Y en el código que pretendamos desarrollar:

.. code-block:: javascript

   import L from "leaflet";
   import "leaflet.mutatismutandis";

Uso básico
==========
Lo más sencillo para explicar el uso de la extensión es hacerlo a partir de un
ejemplo concreto. Así pues, supongamos que nuestra intención es georreferenciar
un conjunto de gimnasios de los cuales nos interesan los siguientes datos:

- Datos identificativos varios. Para simplificar, sólo el nombre, aunque bien
  podrían incluirse también la dirección o el teléfono.
- Horario de apertura.
- Lista de instalaciones: (sala de) musculación, sala (diáfana), piscina, sauna.
- Lista de actividades: pilates, zumba, tabla (de ejercicios), natación libre,
  natación guiada.

Por ahora, nos limitaremos a colocar marcas en el mapa sin intención de
filtrarlas o corregir sus datos iniciales.

Descripción
-----------
Datos
'''''
Como es un estándar, supongamos que éstos se proporcionan con el siguiente
formato JSON:

.. code-block:: json

   {
      "type": "FeatureCollection",
      "features": [
         {
            "type": "Feature",
            "properties": {
               "name": "Identificación",
               "actualizacion": "2019-07-24",
               "ciudad": "Sevilla",
               "tipos": {
                  "musculación": ["mlibre", "mguiada"],
                  "diáfana": ["zumba", "pilates", "yoga"],
                  "piscina": ["nlibre", "nguiada"]
               }
            }
         },
         {
            "type": "Feature",
            "geometry": {
               "type": "Point",
               "coordinates": [-5.997546, 37.388774]
            },
            "properties": {
               "name": "Mr Olympia",
               "horario": ["7:00", "22:00"],
               "inst": ["musculación", "diáfana"],
               "actividades": ["mlibre", "mguiada", "zumba", "yoga"]
            }
         },
         {
            "type": "Feature",
            "geometry": {
               "type": "Point",
               "coordinates": [-5.981517, 37.391519]
            },
            "properties": {
               "name": "VIP",
               "horario": ["6:00", "23:30"],
               "inst": ["musculación", "diáfana", "piscina", "sauna"],
               "actividades": ["mlibre", "mguiada", "nlibre", "zumba", "yoga", "pilates"]
            }
         },
         {
            "type": "Feature",
            "geometry": {
               "type": "Point",
               "coordinates": [-5.992804, 37.395184]
            },
            "properties": {
               "name": "Rocoso",
               "horario": ["8:00", "22:00"],
               "inst": ["musculación", "sauna"],
               "actividades": ["mlibre", "mguiada"]
            }
         }
      ]
   }

En donde:

- El primer dato, es un dato descriptivo general, no un gimnasio, por lo que
  no tiene geometría. Nos informa de a qué ciudad se refieren los datos, de en
  qué fecha se actualizaron y clasifica las posibles actividades según
  la instalación en la que se practican.

- Los gimnasios tienen:

  + Un nombre.
  + Un horario que incluye la fecha de apertura y la de cierre.
  + Las instalaciones de las que goza.
  + Las actividades que se realizan en él.

Plantilla
'''''''''
Los iconos tendrán un aspecto semejante a este:

.. image:: src.examples/images/chupachups.png

que se construyen a partir de una plantilla porque hay dos aspectos que
dependen de parte de los datos:

- El color de fondo que depende de si el ginmasio tiene o no piscima.
- El número que representa la cantidad de actividades que se imparten.

En general, la plantilla puede definirse:

- Mediante código HTML+CSS (como en el caso del ejemplo).
- Mediante un SVG.

Resultado
'''''''''
Nuestra aplicación, una vez hecha, debería lucir así:

.. image:: src.examples/images/captura.png

Y podemos visitarla a través de `este enlace
<https://sio2sio2.github.io/leaflet.mutatismutandis/examples/index.html>`_.

.. note:: Por ahora, nos limitamos a utlizar la extensión para representar
   gráficamente parte de los datos asociados. Más adelante introduciremos
   la capacidad de filtrado y corrección.

HTML
----

.. code-block:: html

   <!DOCTYPE html>
   <html lang="es">
      <title>Gimnasios con leaflet.mutatismutandis</title>
      <meta charset="UTF-8">

      <!-- Leaflet -->
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" crossorigin=""
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==">
      <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" crossorigin=""
              integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="></script>

      <!-- Plugin -->
      <script src="../dist/leaflet.mutatismutandis.js"></script>

      <!-- Scripts/CSS oara este ejemplo -->
      <link rel="stylesheet" href="css/index.css">
      <script src="js/index.js"></script>

      <!-- Body -->

      <!-- Aqúi se inserta el mapa -->
      <div id="map"></div>

      <!-- Plantilla para construir los iconos -->
      <template id="iconocss">
         <div class="content"><span></span></div>
         <div class="arrow"></div>
      </template>
   </html>

Del código sólo es preciso puntualizar que el `<template>
<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template>`_ define la
plantilla, aunque se requiere, además, un fichero CSS. Una alternativa a la
definición del fichero mediante HTML+CSS es utilizar SVG (en fichero aparte o
definido mediante plantilla como en el ejemplo).

Javascript
----------
El código *Javascript* es este:

.. code-block:: js

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
   
Este fichero tiene dos partes bien diferencias\ [#]_:

- La función que crea la plantilla (:code:`crearIcono()`).

- La función que se ejecuta al cargar la página y que es básicamente lo que se
  haría para cargar un mapa y sobre él una serie de datos en formato GeoJSON.
  La diferencia que introduce el uso de la extensión es mínima: al añadir las
  marcas sobre el mapa, debemos asegurarnos de que la plantilla se haya
  cargado completamente, de ahí que en vez de tener una línea así:

  .. code-block:: js

     layer.addData(datos);
      
  tegamos la línea así:

  .. code-block:: js

     Icono.onready(() => layer.addData(datos));
      
   .. note:: En este caso, al estar la definición de la plantilla incluida
      dentro del propio HTML, la prevención es vana; pero si la plantilla se
      hubiera cargado de un fichero externo, entonces sería indispensable.

Lo realmente enjundioso en el código es la creación de la plantilla que, aunque
puede realizarse a través de `L.DivIcon.Mutable`_, es mejor hacer a través de

.. _L.utils.createMutableIconClass:

**L.createMutableIcon(name, options)**
   Simplifica la creación de una plantilla:

   * **name**: nombre que se le quiere dar a la plantilla.
   * **options**: Objeto que proporciona las opciones para su creación. A las
     opciones que se usan en la creación de iconos con `L.Icon
     <https://leafletjs.com/reference-1.5.0.html#icon>`_ añade las siguientes
     específicas:

     +-----------+---------------------------------------------------------------+
     | Opción    | Descripción                                                   |
     +===========+===============================================================+
     | html      | Código que define la plantilla. Puede pasarse una cadena, un  |
     |           | elemento, el contenido de un `<template>` o la respuesta XML  |
     |           | a una petición AJAX. El contenido puede ser un trozo de HTML  |
     |           | o SVG.                                                        |
     +-----------+---------------------------------------------------------------+
     | url       | URL de la que obtener la plantilla. La respuesta puede ser un |
     |           | trozo de HTML o un SVG.                                       |
     +-----------+---------------------------------------------------------------+
     | css       | URL al CSS que complementa al HTML de definición. No es       |
     |           | necesario en caso de que la definición se haga mediante SVG.  |
     +-----------+---------------------------------------------------------------+
     | converter | Objeto conversor definido a través de `L.utils.Converter`_.   |
     +-----------+---------------------------------------------------------------+
     | updater   | Función de actualización de los detalles visuales de la       |
     |           | plantilla. Recibe como argumento un objeto con las opciones   |
     |           | de dibujo que han cambiado desde la última actualización del  |
     |           | icono e implementa cómo sus valores se traducen en detalles.  |
     |           | Una opción indefinida significa que su detalle asociado debe  |
     |           | mantenerse inalterado.                                        |
     +-----------+---------------------------------------------------------------+

Para entender la función :code:`crearIcono()` en su totalidad debe tenerse
presente que los datos asociados a un gimnasio:

* *name*, una cadena.
* *horario*, un array con la hora de apertura y la de cierre.
* *inst*, un array que enumera las instalaciones del ginmasio.
* *actividades*, un array que enumera las actividades que ofrece.

deben traducirse a las opciones de dibujo:

* *piscina*, que toma valor verdadero o falso y significa si el ginmasio tiene
  piscina. Por tanto, se obtiene a partir del dato *inst*.

* *numact*, número que representa la cantidad de actividades y se obtiene a
  partir de *actividades*.

Para llevar a cabo esta labor de traducción entre datos y opciones de dibujo es
necesario definir un objeto conversor mediante

.. _L.utils.Converter:

**L.utils.Converter(opciones[])**
   Define cómo realizar las conversiones entre los datos y las opciones de
   dibujo. Durante la creación debe pasarse un array que contenga los nombres de
   las opciones:

   .. code-block:: js

      const converter = new L.utils.Converter(["piscina", "numact"]);

   Sin embargo, para que el conversor quede definido, es necesario expresar cómo
   se llevan a cabo las conversiones:

   .. _define:

   * **define(opcion, origen[], fn)**
     Método del objeto que define cómo obtener (tercer argumento) la opción cuyo
     nombre se manifiesta en el primero argumento, a partir de la lista de datos
     definida con el segundo argumento:

     .. code-block:: js

        converter.define("numact", ["actividades"], a => a.length);

     Con esta línea se define que la opción *numact* se obtiene exclusivamente a
     partir del dato *actividades* según la función referida. La función toma
     como argumentos los valor de los datos referidos en el array en el orden en
     que aparecen en el array. Por tanto, *a* es el valor de *actividades*, y la
     función devuelve la longitud del array, esto es, el número de actividades.
     Como es muy común que una opción de dibujo, dependa únicamente de un sólo
     dato, está permitido en ese caso ahorrarnos la expresión del array:

     .. code-block:: js

        converter.define("numact", "actividades", a => a.length);

     Además, el método devuelve el propio objeto, lo cual propicia que pueda
     usarse encadenado hasta definir por completo todas las conversiones:

     .. code-block:: js

      const converter = new L.utils.Converter(["piscina", "numact"])
                                   .define("numact", "actividades", a => a.length)
                                   .define("piscina", "inst", i => i.includes("piscina"));

   Esta es la sintaxis necesaria para utilizar la extensión. aunque si se desea
   analizar el código fuente de la extensión es conveniente conocer la `el resto
   de la API de L.utils.Converter <L.utils.Converter.plus>`_.

Por su parte la funcion de *actualización* es bastante trivial, ahora bien:

.. warning:: Asegúrese al implementarla de que el valor indefinido de una opción
   de dibujo, no altera el detalle de la plantilla asociado a tal opción.

.. warning:: Tenga cuidado de usar en una función de conversión ``length`` para
   calcular la longitud del array, porque cuando sobre el dato se define `alguna
   corrección <correcciones>`_, :code:`length` no tiene en cuenta el efecto de
   tal corrección. Más adelante trataremos cómo debe hacerse,

En consecuencia, la definición de la clase de marca se reduce a incluir la
opción *mutable* con la expresión del atributo en el que se acoplan los datos.
`L.GeoJSON`_ acopla el dato completo en el atributo *feature*, por lo que las
propiedades que interesan se encuentrarán en *feature.properties*.

.. _L.Marker.Mutable:

**L.Marker.Mutable**
   El constructor permite crear clases de marcas mutables con sólo añadir al
   extenderlo la opción *mutable* cuyo valor debe ser el atributo en el que se
   acoplan los datos. Por lo demás, pueden añadírsele lo mismo que a
   `L.Marker`_:

   .. code-block:: js

      const Gym = L.Marker.Mutable.extend({
         options: {
            mutable: "feature.properties",
            // filter: layer  // Introduciremos está opción al tratar los filtros.
         }
      });

   Excluyendo los relacionados con los aún inexplorados filtros y correcciones:

   * Atributos:

     .. _store:

     **.store**
      Atributo del constructor que en un array almacena todas las marcas que
      se han definido con él:

      .. code-block:: js

         for(const g of Gym.store) {
            console.log(`Gimnasio: ${g.getData().name}`);
         }

      .. warning:: La diferencia entre:

         .. code-block:: js

            layer.getLayers()

         .. code-block:: js

            Gym.store

         es que mientras lo primero devuelve las marcas que se encuentran en el
         mapa, lo segundo devuelve todas las marcas creadas con el constructor
         incluso aunque no estén en el mapa (p.e. por encontrarse la marca
         filtrada).

   * Métodos:

     .. _getData:

     **.getData()**
      Método del objeto que devuelve los datos acoplados a la marca:

      .. code-block:: js

         // g es uno de los gimnasios.
         g.getData() === g.feature.properties  // true.

     .. _changeData:

     **.changeData(obj)**
      Método del objeto que modifica los valores de los datos asociados. Este
      método está pensado para modificar datos que no sean series de valores
      (como en el ejemplo son *inst* y *actividades*), ya que para la
      modificación de series se utiliza el `sistema de correcciones
      <correcciones>`.

      Los datos deben modificarse a través de este método (o el sistema de
      correcciones); y no directamente, porque sólo así podrá actualizarse
      el aspecto del icono o comprobarse si la marca con los nuevos debe quedar
      filtrada.

      .. code-block:: js

         // El horario es un array, pero no es una serie.
         g.changeData({horario: ["6:00", "23:00"]});
      
     .. _refresh:

     **.refresh()**
      Método de instancia que redibuja el icono en caso de que sea necesario,
      esto es, en caso de que sus opciones de dibujo hayan cambiado desde la
      última vez que se refrescó:

      .. code-block:: js

         g.refresh();

     .. _invoke:

     **.invoke(method, fn_progress, arg1, arg2, ...)**
      Método del constructor que aplica el método suministrado a todas las
      marcas de la clase, esto es, a todos los elementos de ``.store``.

      * **method**: El nombre del método que se quiere aplicar a todas las
        marcas.
      * **fn_progress**: Para el caso de que se prevea que la aplicación
        repetida del método a tantas marcas, puede bloquear el navegador durante
        deamsiado tiempo, función que se invocará cada 200ms justo antes de
        hacerse una pausa de 50ms para desbloquear la interfaz. Para dotar a la
        función de la utilidad de informar al usuario del progreso recibe tres
        argumento: la posición de la marca en `.store()` , el total de marcas y
        el tiempo transcurrido en milisegundos desde que empezó la tarea. Un
        valor nulo o indefinido de este argumento, deshabilita esta ejecución a
        saltos.
      * **arg1**, **arg2**, etc: Argumentos adicionales que se desean pasar
        al método referido con el primer agumento.

        .. code-block:: js

           Gym.invoke("refresh");

   * Eventos: Además de los eventos propios de cualquier marca definidos en
     Leaflet_, se definen los siguientes (exluidos los relacionados con filtros
     y correcciones que se expondrán más adelante):

     .. _e-dataset:

     **dataset**
      Se desencadena en el momento de asociar los datos a las marcas:

      .. code-block:: js

         const layer = L.geoJSON(null, {
            pointToLayer: (f, p) => {
               const marker = new Gym(p, {
                     icon: new Icono(),
                     title: f.properties.name,
               });

               marker.on("dataset", e => {
                  const name = e.target.getData().name;
                  console.log(`Definidos los datos del gimnasio ${name}`);
               });

               return marker;
            }
         }).addTo(map);

     .. _e-iconchange:

     **iconchange**
      Evento que se dispara cada vez que un icono cambia de aspecto como
      consecuencia de un cambio en las opciones de dibujo:

      .. code-block:: js

         g.on("iconchange", e => {
            const name = e.target.getData().name;
            console.log(`Cambio en el aspecto de '${name}' a causa de ${e.reason}`);
         });

      El evento añade dos atributos adicionales (por supuesto, dispone de
      *target* y *type*):

      * **opts**, que contiene las opciones de dibujos que cambiaron entre el
        dibujado anterior y el presente.

      * **reason**, que define la razón por la que se redibuja el icono y puede
        ser una de las dos siguientes:

        - *redraw*, el icono ya dibujado se redibuja porque se forzó su dibujo
          a través del método refresh_.

        - *draw*, el icono se dibuja porque antes no lo estaba por alguna razón
          (p.e. se encontraba filtrado) y durante el tiempo en que se encontraba
          oculto cambiaron las opciones de dibujp, por lo que el aspecto del
          icono no es el mismo que el que tenía cuando desapareció del mapa.

La API de `L.Marker.Mutable`_ no está completa, falta aún `la parte referente a
las correcciones <api-correcciones>`_` y `la parte referente a los filtros
<api-filtros>`_.

.. _correcciones:

Correcciones
============
Otras de las posibilidades que brinda la extensión consiste en corregir los
datos asociados a las marcas, por lo general, con el objeto de desechar
información que no interesa al usuario. Los valores de datos asociados
pueden ser:

- Valores únicos, esto es, el dato particular está compuesto por un único valor.
  En nuestro ejemplo, tanto *name* como *horario* son de este tipo.

- Valores que constituyen una serie. Es el caso de *inst* y *actividades*.

Para llevar a cabo la corrección, *Leaflet.mutatismutandis* proporciona dos
herramientas:

* El método changeData_, que sirve para corregir datos de valor único.
  Desgraciadamente, una vez utilizado, no hay modo de recuperar el dato
  anterior.

* Un sistema de correcciones, que sirve para corregir datos que son series.
  Analizaremos este sistema de correcciones.

Correcciones simples
--------------------
Retomemos el ejemplo anterior y enriquezcámoslo para permitir al usuario:

- Desechar de los datos las instalaciones que no le interesen.
- Desechar de los datos las actividades que no le interesen.

Para llevar a cabo esto, debemos registrar que se llevarán a cabo las
correcciones sobre esos dos datos, o sea:

.. code-block:: js

   function agregarExtras() { // this es Gym.
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

Podemos cargar este segundo ejemplo en `esta segunda dirección
<https://sio2sio2.github.io/leaflet.mutatismutandis/examples/index.html?num=2>`_.

Para registrar sobre la clase de marca una corrección necesitamos:

- Darle un nombre a la corrección (p.e. "actividades").
- Definir sobre qué dato se aplica la corrección a través de *attr* (p.e.
  *actvidades*).
- Definir cómo se lleva a cabo la corrección a través de *func*. La función
  tiene como contexto la marca que corrige y recibe como argumentos:

  * **idx**, que es el índice dentro de la serie que se comprueba,
  * **act**, que contiene el array completo de actividades.
  * **opts**, que contiene las opciones de aplicación de la corrección.

  y devuelve code:`true` si el valor debe ser desechado o :code:`false` en caso
  contrario.

Lo indicado aquí no aplica la corrección, simplemente, define una (dos más
bien). Aplicar la corrección implicaría, en algún momento lo siguiente:

.. code-block:: js

   Gym.correct("instalaciones", {inst: ["piscina"]});

Al aplicarse, para cada una de las marcas incluidas en `Gym.store <store>`_, se
irán recorriendo uno a uno todos los valores de *instalaciones* y aplicando la
función. Si se analiza el algoritmo se verá que el sentido de la corrección es
eliminar las actividades que se encuentran en la lista que se suministra; a
menos que se incluya también como verdadero el atributo *inv* (invertir el
sentido), en cuyo caso el sentido es conservar las instalaciones que se
proporcionan.

Es importante, tener presente que aplicar una corrección corrige los datos y la
opciones de dibujo asociadas, pero no redibuja los iconos automáticamente. Para
que la corrección se manifieste visualmente, es necesario *refrescar*:

.. code-block:: js

   Gym.invoke("refresh");

Para revocar el efecto de la corrección:

.. code-block:: js

   Gym.uncorrect("instalaciones");
   Gym.invoke("refresh");

En principio, el efecto de una corrección es recalcular la propiedad array a fin
de eliminar (o incluso añadir, como veremos más adelante) los elementos que
estipule dicha corrección. Por tanto, si no llegamos a revocar la corrección:

.. code-block:: js

   g.getData().inst

devolverá las instalaciones del gimnasio *g*, pero sin incluir la piscina aunque
la tuviera. Ahora bien, pueden existir casos en los que nos interese conocer qué
elementos han sido eliminados y cuál o cuáles han sido las correcciones que han
provocado ese efecto. Para acceder a esta información, el array añade el
atributo *correctable*:

.. code-block:: js

   g.getData().inst.correctable

que es, a su vez, una suerte de *array* que presenta el siguiente comportamiento:

- Los métodos y atributos propios de un *array* mantienen su comportamiento,
  (entre ellos, :code:`length`) por lo que siempre devolverán o recorrerán todos
  lo elmentos del array, los originariamente presentes y los que se puedan
  añadir\ [#]_.

- El atributo :code:`total` devuelve sólo los valores que no se han desechado
  como consecuencia de una o más correcciones.

- Iterar sobre el array con :code:`for .. of` o :code:`Array.from` devuelve
  también todos los valores, pero cada elemento obtenido no es el valor
  original, sino un nuevo objeto que:

  - Si el valor original ya era un objeto, devuelve un objeto con las mismas
    propiedades, al que se le añade una más llamada *filters* que es un array
    con los nombres de las correcciones que han filtrado el valor. Si la lista
    está vacía, el valor no se habrá filtrado.

  - Si el valor original era un tipo primitivo, se devuelve un objeto con dos
    atributos: *value* que almacena el valor original y *filters* con el
    significado ya definido.

  En ambos casos, el objeto devuelto incluye un método :code:`.isPrimitive()`
  para saber si el valor original era un tipo primitivo o un objeto.

En consecuencia, podríamos escribir un código semejante a este para obtener una
información completa del dato corregido:

.. code-block:: js

   for(const x of g.thisData().inst.correctable) {
      const activo = x.filters.length === 0?"activo":"desactivo",
            valor = x.isPrimitive()?x.value:x;

      console.log(`${activo} -- ${valor}`);
   }

.. note:: Una misma corrección no es acomulativa: si una misma corrección se
   ise aplica una segunda vez, se desaplica la corrección previa y se aplica con
   las nuevas opciones.

.. _auto-corr:

Correcciones automáticas
------------------------
Puede darse la circunstancia de que los datos que presentan las entidades no
sean independientes entre sí. Es el caso de nuestro ejemplo, en el que desechar
un tipo de instalación debería suponer que se desechen todas las actividades
que requieren tal actividad. Por ejemplo, lo lógico al desechar la instalación 
*piscina* es que se deseen desechar también las actividades *nlibre* y
*nguiada*. Para ello la extensión permite definir correcciones que se
desencadenen automáticamente. Para el código propuesto, lo descrito obligaría a
redefinir la corrección *instalaciones*:

.. code-block:: js

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

Prueba la aplicación con este cambio en `este tercer enlace
<https://sio2sio2.github.io/leaflet.mutatismutandis/examples/index.html?num=3>`_.

Para provocar que la aplicación de la corrección *instalaciones* desencadene
automáticamente la aplicación de la corrección *actividades*. Aparecen dos
nuevos atributos: *autochain*, que indica si el desencadenamiento se produce
siempre (``true``) o si hay que especificarlo al aplicar; y *chain* que define
la lista de correcciones automáticas provocadas por la corrección definida.
Para cada corrección automática es necesario especificar cuál y una función que
permita traducir las opciones de aplicación de la corrección de origen en las
opciones de aplicación de la corrección automática. Por ejemplo, si una
corrección *instalaciones* se aplica con estas opciones:

.. code-block:: js

   {opts: ["piscina"], inv: true}

eso significa que la aplicación automática de la corrección *actividades*
debería ser:

.. code-block:: js

   {opts: ["nlibre", "nguiada"], inv: true}

esto es, si desecha la instalación *piscina*, eso significa que se deben
desechar las actividades que se llevan a cabo en la piscina.

Para aplicar la corrección *instalaciones* y que automáticamente se desencadene
la corrección *actividades* es necesario hacer:

.. code-block:: js

   Gym.correct("instalaciones", {inst: ["piscina"]}, true);

Hay dos puntualizaciones pertinentes:

- Las correcciones automáticas se revierten al revertir la corrección manual que
  las originó.

- Aunque ya se indicó que dos correcciones manuales de un mismo tipo no son
  compatibles y que al intentar hacerlo, solo tiene efecto la última; sí son
  compatibles una corrección manual con una corrección automática (o varias
  si si las automáticas procedían de varias correcciones manuales). En
  consecuencia, a pesar de mantener aplicada la corrección anterior, se puede
  hacer::

      Gym.correct("actividades", {act: ["pilates"]});

.. _corr-plus:

Correcciones adictivas
----------------------
Hay, finalmente, otro tipo de corrección algo más extravagante, que permite añadir
valores a la serie, en vez de eliminar parte de los existentes. En el ejemplo
ilustrativo, podríamos imaginar que, además de las instalaciones existentes, los
gimnasios pueden haber anunciado las instalaciones en construcción que tendrás
disponibles en el futuro. Algo así:

.. code-block:: json

   {
      "type": "Feature",
      "geometry": {
         "type": "Point",
         "coordinates": [-5.992804, 37.395184]
      },
      "properties": {
         "name": "Rocoso",
         "horario": ["8:00", "22:00"],
         "inst": ["musculación", "sauna"],
         "constr": ["piscina"],
         "actividades": ["mlibre", "mguiada"]
      }
   }

La corrección adictiva podría consistir en añadir las instalaciones en
construcción a las ya construídas:

.. code-block:: js

   this.register("const+", {
      attr: "inst",
      add: true,
      func: function(idx, adj, opts) {
         const data = this.getData();
         return data.constr;
      }
   });

Estas correcciones se identifican por añadir el atributo *add* con valor
verdadero y no actúan de la misma forma: no recorren el array ejecutando la
función para cada elemento de la serie, puesto que no tiene sentido, sino que se
ejecuta una sólo vez y devuelve los elementos a añadir.

.. warning:: La función debe devolver los elementos, no añadirlos ella al array.

.. _api-correcciones:

API
---
Ahora estamos en condiciones de añadir a la API de `L.Marker.Mutable`_ más métodos
y eventos, relacionados estos con las correcciones:

* Métodos:

  .. _register:

  **register(name, opts)**
   Método del constructor que registra una corrección en la clase de marca:

   * **name**, nombre que tendrá la corrección.
   * **opts**, opciones para la definición de la corrección:

     +-----------+--------------------------------------------------------------+
     | Opción    | Descripción                                                  |
     +===========+==============================================================+
     | attr      | Nombre del dato sobre el que se aplica la corrección.        |
     +-----------+--------------------------------------------------------------+
     | add       | Si se incluye y es verdadera, la corrección es adictiva.     |
     +-----------+--------------------------------------------------------------+
     | autochain | Si se incluye y es verdadera, las correcciones automáticas   |
     |           | definidas mediante *chain* se desencadenan sin necesidad de  |
     |           | indicarlo explícitamente al aplicar la corrección con        |
     |           | correct_.                                                    |
     +-----------+--------------------------------------------------------------+
     | chain     | Lista de correcciones automáticas. Cada elemento de la lista |
     |           | es un objeto con dos atributos: *corr*, que expresa el       |
     |           | nombre de la corrección que se desencadena automáticamente,  |
     |           | y *func* que define cómo las opciones de la corrección se    |
     |           | transforman en las opciones de aplicación de la corrección   |
     |           | automática.                                                  |
     +-----------+--------------------------------------------------------------+
     | fn        | Función que se ejecuta para cada marca al aplicarse la       |
     |           | corrección. Si la corrección no es adictiva, se recorrerá la |
     |           | serie elemento a elemento para determinar si el elemento     |
     |           | eliminarse o mantenerse; si es adictiva, se ejecuta una vez  |
     |           | y devuelve los elementos que debe añadirse a la serie.       |
     +-----------+--------------------------------------------------------------+

  .. _correct:

  **correct(name, opts, auto)**
   Método del constructor que aplica una corrección sobre todas las marcas de
   una misma clase:

   * **name**, nombre de la corrección que quiere aplicarse.
   * **opts**, opciones de aplicación de la corrección.
   * **auto**, si ``true``, aplica también las correcciones automáticas
     definidas.

  .. _uncorrect:

  **uncorrect(name)**
   Método del constructor que revierte la corrección sobre todas las marcas de
   una misma clase. Si la corrección supuso el desencadenamiento de otras
   correcciones, la reversión también supone la reversión de estas.

  .. _reset:

  **reset(deep)**
   Método del constructor que desaplica todas las correcciones y vacía
   store_. Si se proporciona *deep* con valor ``true`` desaplica también los
   filtros.

  .. _getAutoCorrect:

  **getAutoCorrect(name)**
   Devuelve las correcciones manuales que han desencadenado automáticamente la
   corrección cuyo nombre se suministra:

   .. code-block:: js

      Gym.getAutoCorrect("actividades");  // Devuelve {instalaciones: {inst: ["piscina"]}}

  .. _getCorrectStatus:

  **getCorrectStatus()**
   Devuelve el estado de las correcciones en forma de objeto con dos atributos:

   * **manual**. que desglosa las correcciones que se aplicaron
     manualmente. El objeto tiene como plaves los nombres de las correcciones
     y los valores, sus opciones de aplicación.
   * **auto**, que desglosa las correcciones que se aplicaron automáticamente
     como consecuencia de algún encadenamiento. El objeto tiene por claves
     los nombres de las correcciones y los valores un objeto, a su vez, en que
     las claves son los nombres de las correcciones aplicadas manualmente que
     provocaron la aplicación automática y los valores las opciones de
     aplicación automática.

  **appliedCorrections(name, opts, type)**
   Método del constructor que permite saber si la aplicación de una corrección
   es irrelevante, porque ya existen otras aplicadas que ya provocan ese efecto:

   * **name**, nombre de la corrección.
   * **opts**, opciones con las que se pretende aplicar la corrección.
   * **type**, tipo de comprobación que se desea realizar:

     - *auto* comprueba si el efecto de la corrección con tales condiciones
       ya lo provocan las aplicaciones automáticamente de dicha corrección.

     - *manual* comprueba si el efecto ya lo incluye la aplicación manual
       actualmente vigente (si es que existe).

     - Cualquier otro valor realiza la comprobación tanto en la aplicación
       manual como en las automáticas.

* Eventos:

  .. _e-correct:

  **correct:name**
   Evento del constructor ligado se la aplicación de la corrección
   indicada. El evento dispone adicionalmente de los atributos:

   * **name**, cuyo valor es el nombre de la corrección.
   * **auto**, que informa de si la corrección es manual (``false``) o se
     desencadenó automáticamente (``true``).
   * **opts**, que contiene las opciones con las que se aplicó
     la corrección.

   .. code-block:: js

      Gym.on("correct:instalaciones", e => {
         const modo = e.auto?"automática":"manual";
         console.log(`Aplicado ${modo}mente una corrección ${e.name}:`, ${e.opts});
      });

   Puede usarse "*\**" como *name* para ligar el evento a cualquier corrección.

  .. _e-uncorrect:

  **uncorrect:name**
   Evento del constructor ligado a la reversión de la corrección indicada.
   También puede usarse "*\**" como *name*.

Para terminar de definir el API restan aún los métodos y eventos relacionados
con el filtrado.

.. _filtros:

Filtros
=======
La extensión permite también definir para cada clase de marca un sistema de
filtros que oculte las marcas según unos criterios predefinidos. Para
habilitarlo, no obstante, es necesario incluir la opción *filter* al definir la
clase:

.. code-block:: js

   function crearMarca(layer) {
      return L.Marker.Mutable.extend({
         options: {
            mutable: "feature.properties",
            filter: layer
         }
      });
   }

*filter* admite varios valores que se verán al tratar el `estilo de filtrado`_.
Uno de los posibles es la capa a la que pertenecerán las marcas, que tiene el
efecto de hacer desaparecer del mapa las marcas filttradas.

Como en el caso de las correcciones, es preciso registrar los filtros:

.. code-block:: js

   this.registerF("actmin", {
      attrs: "actividades",
      func: function(opts) {
         return this.getData().actividades.total < opts.min;
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

La aplicación y reversión de filtros es semejante a la que se hace para las
correcciones:

.. code-block:: js

   Gym.filter("horario", {open: "7:30"});
   Gym.invoke("refresh");

Y la reversión:

.. code-block:: js

   Gym.unfilter("horario");
   Gym.invoke("refresh");

El ejemplo con algunos filtros definidos puede visitar `en este cuarto enlace
<https://sio2sio2.github.io/leaflet.mutatismutandis/examples/index.html?num=4>`_.

Estilo de filtrado
------------------
Ya se ha indicado que para habilitar el sistema de filtros es necesario incluir
la opción *filter*. El valor que tenga esta opción determina cuál es el efecto
de que una marca quede filtrada:

* La *capa* en la que se insertan las marcas, cuyo efecto es hacer desaparecer
  completamente la marca.

* Una *cadena* cuyo valor es el nombre de la clase CSS que se aplicará a la
  marca al ser filtrada.

  .. code-block:: js

     function crearMarca(layer) {
        return L.Marker.Mutable.extend({
           options: {
              mutable: "feature.properties",
              filter: "filtrado"
           }
        });
     }

  Y podría definir la clase CSS así:

  .. code-block:: css

     .filtrado {
         filter: grayscale(100%);
     }

  De este modo, al filtrarse una marca aparecerá en gris.

* Una *función* cuyo contexto es el elemento de la marca y lo modifica a
  voluntad:

  .. code-block:: js

     function crearMarca(layer) {
        return L.Marker.Mutable.extend({
           options: {
              mutable: "feature.properties",
              filter: function(filtered) {
                  if(filtered) this.style.filter = "grayscale(100%)";
                  else this.style.removeProperty("filter");
              }
           }
        });
     }

  El ejemplo tiene el mismo efecto que usar la función predefinida
  `L.utils.grayFilter`_:

  .. code-block:: js

     function crearMarca(layer) {
        return L.Marker.Mutable.extend({
           options: {
              mutable: "feature.properties",
              filter: L.utils.grayFilter
           }
        });
     }

.. warning:: Cuando el estilo de filtro no elimina las marcas del mapa y se usa
   una capa `L.MarkerClusterGroup`_, el número del cluster incluirá las marcas
   filtradas, ya que estas siguen en el mapa. Para evitarlo y que sólo
   represente las marcas no filtradas puede cambiarse la función que crea los
   iconos para los clusters y pasarla a través de la opción
   *iconCreateFunction*. La librería trae ya una hecha con este fin:

   .. code-block:: js

      const layer = L.markerClusterGroup({
         iconFunctionCreate: L.utils.noFilteredIconCluster
      }).addTo(map);

.. _api-filtros:

API
---
Para completar la API de `L.Marker.Mutable`_, faltan aún los métodos y eventos
asociados al filtrado:

* Métodos:

  .. _registerF:

  **registerF(name, opts)**
   Método del constructor que registra un filtro para una clase de marca:

   * **name**: nombre que tomará el filtro.
   * **opts**: opciones para la definición del filtro:

     +-----------+-------------------------------------------------------------+
     | opción    | descripción                                                 |
     +===========+=============================================================+
     | attrs     | Lista de datos involucrados en el cálculo del filtro. Es un |
     |           | array, pero si el dato es uno, puede ahorrarse la expresión |
     |           | del array, como es el caso del ejemplo.                     |
     +-----------+-------------------------------------------------------------+
     | func      | Función para determinar si la marca se filtra (devolviendo  |
     |           | ``true``). Su contexto es la propia marca que se desea      |
     |           | comprobar.                                                  |
     +-----------+-------------------------------------------------------------+

  .. _filter:

  **filter(name, opts)** 
   Método del constructor que aplica a todas las marcas de la clase el filtro de
   nombre indicado con las opciones de filtro indicadas.

   * **name**: nombre del filtro aplicado.
   * **opts**: opciones de aplicación del filtro.

  .. _unfilter:

  **unfilter(name)**
   Método del constructor que revierte el efecto del filtro.

  .. _hasFilter:

  **hasFilter()**
   Método del constructor que informa de si se ha aplicado el filtro:

   .. code-block:: js

      Gym.hasFilter("horario");  // Verdadero si se aplicó el filtro.

  .. _getFilterStatus:

  **getFilterStatus()**
   Método del constructor que devuelve un objeto cuyas claves son los nombres de
   los filtros aplicados y cuyos valores, las opciones de aplicación
   correspondientes.

  .. _setFilterStyle:

  **setFilterStyle(estilo)**
   Método del constructor que permite modificar el `estilo de filtrado`_ para
   los iconos de la marca. El argumento estilo puede tomar los valores descritos
   para la opción *filter*.

   En este caso, a diferencia de cuando se aplican filtros y correcciones, el
   redibujado de marca se hace sin necesidad de invocar el método refresh_.

Otras definiciones
==================

.. _L.utils.noFilteredIconCluster:

**L.utils.noFilteredIconCluster(cluster)**
   Redefine iconCreateFunction basándose en la definición original de
   `L.MarkerClusterGroup`_ para que el número del clúster sólo cuente los
   centros no filtrados.

.. _L.utils.grayFilter:

**L.utils.grayFilter(filtered)**
   Pone en escala de grises un icono filtrado o elimina tal escala si ya no lo
   está.

.. _L.utils.load:

**L.utils.load(opts)**
   Realiza peticiones AJAX. Las peticiones serán asíncronas, a menos que no se
   proporcionen función de *callback* ni *failback*.


   +-----------+---------------------------------------------------------------+
   | Opción    | Descripción                                                   |
   +===========+===============================================================+
   | url       | URL de la petición                                            |
   +-----------+---------------------------------------------------------------+
   | method    | Método HTTP de petición. Por defecto es *GET*, si no se       |
   |           | envían parámetros y *POST*, si sí se hace.                    |
   +-----------+---------------------------------------------------------------+
   | params    | Parámetros que se envían en la petición.                      |
   +-----------+---------------------------------------------------------------+
   | callback  | Función que se ejecuta si la petición tiene éxito. La función |
   |           | tendrá como único argumento el objeto XMLHttpRequest_.        |
   +-----------+---------------------------------------------------------------+
   | failback  | Función que se ejecutará cuando la petición falle. También    |
   |           | admite como argumento un objeto XMLHttpRequest_.              |
   +-----------+---------------------------------------------------------------+
   | context   | Objeto que usará como contexto las funciones de callback y    |
   |           | failback.                                                     |
   +-----------+---------------------------------------------------------------+

   Por ejemplo:

   .. code-block:: js

      L.utils.load({
         url: "image/logo.svg",
         callback: function(xhr) { 
            const svg = xhr.rsponseXML;
            console.log("Éxito");
         }
      });

.. _L.DivIcon.Mutable:

**L.DivIcon.Mutable**
   Extensión de L.DivIcon_ a fin de crear iconos definidos por una plantilla a
   la que se aplican cambios en sus detalles según sean los valores de
   sus opciones de dibujo.

   .. warning:: Es preferible usar `L.utils.createMutableIconClass`_ para esta
      labor.

   .. code-block:: js

      function crearIcono() {
         const len = x => x.total === undefined?x.length:x.total;
         const converter = new L.utils.Converter(["piscina", "numact"])
                                      .define("numact", "actividades", a => len(a))
                                      .define("piscina", "inst", i => i.includes("piscina"));

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

         return L.DivIcon.Mutable.extend({
            className: "chupachups",
            iconSize: [25, 34],
            iconAnchor: [12.5, 34],
            html: document.querySelector("template").content,
            css: "images/chupachups.css",
            converter: converter,
            updater: updater
         });
      }

   Métodos:

   **isready()**
      Devuelve ``true`` si el icono puede ya usarse\ [#]_.

   **onready(fn_success, fn_fail)**
      Ejecuta la función suministrada como primer argumento cuando el
      constructor esté listo o la segunda, si falla su creación:

      .. code-block:: js

         const Icono = crearIcono();
         Icono.onready(() => {
            console.log("¿Está listo ya el icono?", Icono.isready()); // true
            const icono = new Icono();.
         });

.. _L.utils.Converter.plus:

**L.utils.Converter**
   Al ya definido método `define`_, la API añade los siguiente atributos y
   métodos:

   * Atributos:

     .. _defined:

     **defined**
      Atributo del objeto que informa de si todas las propiedades habilitadas
      tienen definida una conversión.

     .. _params:

     **params**
      Las propiedades definidas para el objeto resultante.

     .. _enabled:

     **enabled**
      Lista de las propiedad habilitadas.

   * Métodos:

     .. _disable:

     **disable(param)**
      Deshabilita una propiedad del objeto. Esto significa que, cuando se obre
      la conversión del objeto, nunca se intentará obtener el valor de esta
      propiedad.

     **enable(param)**
      Habilita una propiedad del objeto.

     **isDefined(param)**
      Informa de si la propiedad tiene definida la conversión.

     **run(o)**
      Lleva a cabo la conversión del objeto suministrado. Sólo se obtienen las
      propiedades que estén habilitadas y para las que se pueda realizar la
      conversión, porque exista toda la información requerida en el objeto
      que se proporciona.

.. [#] Siempre que, claro está, hayamos establecido que pinchar sobre la marca
   nos muestra sus datos en detalle.

.. [#] Pero, obviamente, no el CSS de Leaflet_.

.. [#] Falta aún otra que es la definición de la clase de marca (*Gym*), pero
   esa se encuentra en el otro fichero.

.. [#] Ya veremos que es posible definir `correcciones que añaden valores
   <corr-plus>`_`

.. [#] Si se ha proporcionado una URL, se deberá hacer una petición que
   consume un tiempo, por lo que entre el momento en que se crea el icono
   y el momento en que se desea utilizar, puede no estar aún disponible.

.. _Leaflet: https://leafletjs.com
.. _NodeJS: https://nodejs.org
.. _L.GeoJSON: https://leafletjs.com/reference-1.5.0.html#geojson
.. _L.Marker: https://leafletjs.com/reference-1.5.0.html#marker
.. _L.DivIcon: https://leafletjs.com/reference-1.5.0.html#divicon
.. _L.MarkerClusterGroup: https://github.com/Leaflet/Leaflet.markercluster
.. _XMLHttpRequest: https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest
