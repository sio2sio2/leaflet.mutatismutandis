// webpack/webpack.common.js
const webpack = require("webpack");

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

   if(env.output !== "bundle") {
      config.externals = {
         leaflet: {
            root: "L",
            amd: "leaflet",
            commonjs: "leaflet",
            commonjs2: "leaflet"
         }
      };

      Object.assign(config.output, {
         libraryTarget: "umd",
         umdNamedDefine: true,
         library: "Lcz"
      });
   }

   return config;
}
