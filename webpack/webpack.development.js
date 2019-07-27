// webpack/webpack.development.js
const merge = require('webpack-merge');

module.exports = env => {
   const common = require('./webpack.common.js')(env);

   const config = {
      mode: "development",
      devServer: {
         contentBase: env.disk && require("path").resolve(__dirname, "../dist"),
         writeToDisk: env.disk
      }
   }

   if(env.output === "src") {
      const webpack = require("webpack");

      Object.assign(config, {
         devtool: false,
         plugins: [
            new webpack.SourceMapDevToolPlugin({
               filename: '[name]-src.js.map'
            })
         ]
      });
   }
   else config.devtool = "inline-source-map";

   return merge(common, config);
}
