require('ts-node').register({ compilerOptions: { module: "commonjs" }});
const {theme} = require('../src/theme');
const path = require('path');
const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);

module.exports =  {
  loader: 'sass-loader',
  options: {
    includePaths: [path.join(__dirname, '../src')],
    functions: {
      /**
       * Found this article for including javascript variables in sass
       * https://itnext.io/sharing-variables-between-js-and-sass-using-webpack-sass-loader-713f51fa7fa0
       */
      "get($keys)": function(keys) {
        keys = keys.getValue().split(".");
        let result = theme;
        let i;
        for (i = 0; i < keys.length; i++) {
          result = result[keys[i]];
        }
        result = sassUtils.castToSass(result);
        return result;
      }
    }
  }
};
