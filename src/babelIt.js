const {transformSync} = require("@babel/core");
const fs = require("fs");
const {forAllJS} = require('./utils');

function babelIt(filter, babelSettings) {

  function compile(code, filename) {
    return transformSync(code, {...babelSettings, filename}).code
  }

  function babelLoader(module, code, filename) {
    module._compile(compile(code, filename), filename);
  }

  return function () {
    let enabled = true;

    // precache
    compile('','fake.js');

    forAllJS(function (ext) {
      const getJS = require.extensions[ext];

      require.extensions[ext] = (module, filename) => {
        let data;
        let filterResult = enabled && filter(filename, module);
        if (enabled && filterResult) {
          if (filterResult === true) {
            filterResult = fs.readFileSync(fileName);
          }
          data = babelLoader(module, filterResult, filename) || module;
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

}

module.exports = babelIt;