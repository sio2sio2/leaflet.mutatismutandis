import MutableMarker from "./mutableMarker.js";
import MutableIcon from "./mutableIcon.js";
import {load, createMutableIconClass, Converter,
        grayFilter, noFilteredIconCluster} from "./utils/index.js";

L.MutableMarker = MutableMarker;
L.MutableIcon = MutableIcon;
L.utils = {
   load: load,
   createMutableIconClass: createMutableIconClass,
   Converter: Converter,
   grayFilter: grayFilter,
   noFilteredIconCluster: noFilteredIconCluster
}
