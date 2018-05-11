const resolution = require('./resolutions');

function setAliases(aliases) {
  const keys = [];
  Object.keys(aliases).forEach(key => {
    keys.push(key)
  });
  keys.sort((a, b) => a.length - b.length);

  return resolution(fileName => {
    if (fileName) {
      if (fileName[0] === '.') {
        return false;
      }
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (fileName.indexOf(key) === 0) {
          return aliases[key] + fileName.substr(key.length);
        }
      }
    }
    return false;
  });
}

module.exports = setAliases;