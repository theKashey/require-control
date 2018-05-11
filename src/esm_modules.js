const babel = require("babel-core");
const fs = require("fs");
const {forAllJS} = require('./utils');

function compile(code) {
  return babel.transform(code, {
    babelrc: false,
    plugins: ["transform-es2015-modules-commonjs"]
  }).code
}

function babelLoader(module, code, filename) {
  module._compile(compile(code, filename), filename);
}

function esm_modules() {
  let enabled = true;

  forAllJS(function (ext) {
    const getJS = require.extensions[ext];

    require.extensions[ext] = (module, filename) => {
      let data;
      if (enabled && filename.indexOf('node_modules') > 0) {
        const code = fs.readFileSync(filename)
        // no imports inside
        if (code.indexOf('import ') === code.indexOf('export ')) {
          data = getJS(module, filename) || module;
        } else {
          data = babelLoader(module, code, filename) || module;
        }
      } else {
        data = getJS(module, filename) || module;
      }

      return data;
    };
  });

  return () => {
    enabled = false;
  }
}

module.exports = esm_modules;