const fs = require("fs");
const babelIt = require('./babelIt');

const esm_modules = babelIt(
    fileName => {
        if (fileName.indexOf('node_modules') > 0) {
            const code = fs.readFileSync(fileName);
            // use reduced version of the code to remove false positives of the check
            // remove comments, but keywords can still be found in strings
            const reducedCode = code.toString('utf-8')
                .replace(/\/\*([^\*]*)\*\//gi, '')
                .replace(/\/\*(.*)\*\//gi, '')
                .replace(/\/\/(.*)/gi, '')
            // no imports inside
            return reducedCode.indexOf('import ') !== reducedCode.indexOf('export ') && code;
        }
        return false;
    }, {
        babelrc: false,
        plugins: ["@babel/plugin-transform-modules-commonjs"]
    }
);

module.exports = esm_modules;
