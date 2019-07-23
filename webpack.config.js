module.exports = env => {
   let mode;

   switch(env.output) {
      case "development":
      case "src":
         mode = "development";
         break;
      default:
         mode = "production";
   }

   return require(`./webpack/webpack.${mode}.js`)(env);
}
