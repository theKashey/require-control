const Module = require('module');

function mirrorModuleCache(condition) {
  const internalCache = {};
  let enabled = true;

  Module._load = function (request, parent, isMain) {

    const filename = Module._resolveFilename(request, parent, isMain);
    const check = enabled && condition(request, filename);
    if (check) {
      Module._cache[filename] = internalCache[filename];
    }

    const result = mLoad(request, parent, isMain);

    if (check) {
      internalCache[filename] = Module._cache[filename];
    }

    return result;
  };
  return () => {
    enabled = false;
  }
}

module.exports = mirrorModuleCache;