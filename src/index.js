if(process.env.output === "bundle") {
   require("leaflet-defaulticon-compatibility");
   require("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css");
}

import MutableMarker from "./mutableMarker.js";
import MutableIcon from "./mutableIcon.js";
import * as utils from "./utils/index.js";

L.Marker.Mutable = MutableMarker;
L.DivIcon.Mutable = MutableIcon;
L.Mutable = {
   Marker: MutableMarker,
   DivIcon: MutableIcon,
   utils: utils
}

export default L.Mutable;
