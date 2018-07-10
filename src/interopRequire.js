const {allHookable} = require('./utils');

function interopRequire(extensions) {
  let enabled = true;

  const ext = extensions || allHookable;
  if(!ext.length){
    throw new Error('interopRequire - extensions should be an array');
  }

  ext.forEach(ext => {
    const getJS = extensions || require.extensions[ext];

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