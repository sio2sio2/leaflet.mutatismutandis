// webpack/webpack.common.js
const webpack = require("webpack"),
      merge = require("webpack-merge");

module.exports = env => {
   let filename;

   switch(env.output) {
      case "min":
      case "debug":
         filename = "[name].js";
         break;
      case "src":
         filename = "[name]-src.js";
         break
      default:
         filename = `[name].${env.output}.js`;
   }

   const config = {
      entry: {
         "leaflet.mutatismutandis": "./src/index.js"
      },
      output: {
         filename: filename
      },
      plugins: [
         new webpack.ProvidePlugin({
            L: "leaflet"
         })
      ]
   }

   if(env.output === "bundle") return config;
   else {
      return merge(config, {
         externals: {
            leaflet: {
               root: "L",
               amd: "leaflet",
               commonjs: "leaflet",
               commonjs2: "leaflet"
            }
         },
         output: {
            filename: filename,
            libraryTarget: "umd",
            umdNamedDefine: true,
            library: "Lcz"
         }
      });
   }
}
