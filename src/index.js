if(process.env.output === "bundle") {
   require("leaflet-defaulticon-compatibility");
   require("leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css");
}

import MutableMarker from "./mutableMarker.js";
import MutableIcon from "./mutableIcon.js";
import {load, createMutableIconClass, Converter,
        grayFilter, noFilteredIconCluster} from "./utils/index.js";

L.Marker.Mutable = MutableMarker;
L.Icon.Mutable = MutableIcon;
L.utils = {
   load: load,
   createMutableIconClass: createMutableIconClass,
   Converter: Converter,
   grayFilter: grayFilter,
   noFilteredIconCluster: noFilteredIconCluster
}

export default MutableMarker;
