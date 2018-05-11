const {forAllJS} = require('./utils');

function webpackDefault() {
  let enabled = true;

  forAllJS(function (ext) {
    const getJS = require.extensions[ext];

    require.extensions[ext] = (module, filename) => {
      const data = getJS(module, filename) || module;
      if (
        enabled &&
        data &&
        ['object', 'function'].indexOf(typeof data.exports) >= 0 &&
        !data.exports.default
      ) {
        data.exports.default = data.exports;
      }

      return data;
    };
  });
  return () => {
    enabled = false;
  }
}

module.exports = webpackDefault;