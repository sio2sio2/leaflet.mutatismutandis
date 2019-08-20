const webpack = require("webpack"),
      merge = require("webpack-merge"),
      path = require("path"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      pack = require("./package.json"),
      name = pack.name;


// Configuración para Babel
function confBabel(env) {
   return {
      module: {
         rules: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                  loader: "babel-loader",
                  options: {
                     presets: [["@babel/env", {
                        debug: env.debug,
                        corejs: 3,
                        useBuiltIns: "usage"
                     }]]
                  }
               }
            },
         ]
      }
   }
}


// Configuración adicional para el sabor bundle,
function confBundle() {
   return {
      entry: {
         [name]: ["leaflet/dist/leaflet.css"]
      },
      module: {
         rules: [
            {
               test: /\.css$/,
               use: [MiniCssExtractPlugin.loader,
                     "css-loader"]
            },
            {
               test: /\.(png|jpe?g|gif|svg)$/i,
               use: [
                  'url-loader?limit=4096&name=images/[name].[ext]'
               ]
            }
         ]
      },
      plugins: [
         new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            chunkFilename: "[id].css"
         })
      ]
   }
}


// Configuración sin dependencias
function confNoDeps() {
   return {
      externals: {
         leaflet: {
            root: "L",
            amd: "leaflet",
            commonjs: "leaflet",
            commonjs2: "leaflet"
         }
      }
   }
} 

// Configuración para desarrollo
// (los mapeos de código fuente en fichero aparte)
function confDev(filename) {
   return {
      devtool: false,
      plugins: [
         new webpack.SourceMapDevToolPlugin({
            filename: `${filename}.map`
         })
      ],
      devServer: {
         contentBase: path.resolve(__dirname, "examples"),
         publicPath: "/dist/",
         watchContentBase: true,
         open: "chromium",
         openPage: "?num=4"
      }
   }
}


module.exports = env => {
   switch(env.output) {
      case "debug":
      case "srcdebug":
         env.mode = "development";
         break;
      default:
         env.mode = "production";
   }

   switch(env.output) {
      case "min":
      case "debug":
         filename = "[name].js";
         break;
      case "src":
         filename = "[name]-src.js";
         break
      case "srcdebug":
         filename = "[name]-debug.js";
         break;
      default:
         filename = `[name].${env.output}.js`;
   }

   const common = {
      mode: env.mode,
      entry: {
         [name]: ["./src/index.js"]
      },
      output: {
         filename: filename,
         libraryTarget: "umd",
         umdNamedDefine: false,
         libraryExport: "default"
      },
      plugins: [
         new webpack.ProvidePlugin({
            L: "leaflet"
         }),
         new webpack.DefinePlugin({
            "process.env": {
               output: JSON.stringify(env.output),
               development: JSON.stringify(env.mode === "development"),
               version: JSON.stringify(pack.version)
            }
         })
      ]
   }

   return merge.smart(
      common,
      env.mode === "production"?confBabel(env):confDev(filename),
      env.output === "src"?{optimization: {minimize: false}}:null,
      env.output === "bundle"?confBundle():confNoDeps()
   )
}
