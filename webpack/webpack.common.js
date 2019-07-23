// webpack/webpack.common.js
const path = require("path"),
      webpack = require("webpack");

module.exports = env => {
   let filename;

   switch(env.output) {
      case "min":
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
         path: path.resolve(__dirname, "../lib"),
         filename: filename
      },
      plugins: [
         new webpack.ProvidePlugin({
            L: "leaflet"
         })
      ]
   }

   if(env.output === "src" || env.output === "min") {
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
