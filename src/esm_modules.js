const fs = require("fs");
const babelIt = require('./babelIt');

const esm_modules = babelIt(
  fileName => {
    if (fileName.indexOf('node_modules') > 0) {
      const code = fs.readFileSync(fileName);
      // no imports inside
      return code.indexOf('import ') !== code.indexOf('export ') && code;
    }
    return false;
  }, {
    babelrc: false,
    plugins: ["transform-es2015-modules-commonjs"]
  }
);

module.exports = esm_modules;