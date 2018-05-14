const {forAllJS} = require('./utils');

function interopRequire() {
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
        Object.defineProperty(data.exports, 'default', {
          enumerable: false,
          value: data.exports
        })
      }

      return data;
    };
  });
  return () => {
    enabled = false;
  }
}

module.exports = interopRequire;