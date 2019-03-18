const hoistExtensions = (hoistedExtensions) => {
  const restExtensions = {};

  Object
    .keys(require.extensions)
    .forEach(name => {
      if (hoistedExtensions.indexOf(name) < 0) {
        restExtensions[name] = require.extensions[name];
        delete require.extensions[name];
      }
    });

  Object.assign(require.extensions, restExtensions);
};

module.exports = hoistExtensions;