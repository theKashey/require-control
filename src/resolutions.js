const Module = require('module');

function nameResolution(resolutor) {
  let enabled = true;

  const originalResolveFilename = Module._resolveFilename;

  Module._resolveFilename = function (request, _parent) {
    const match = enabled && resolutor(request, _parent);
    if (match) {
      const modifiedArguments = [match].concat([].slice.call(arguments, 1)); // Passes all arguments. Even those that is not specified above.
      return originalResolveFilename.apply(this, modifiedArguments);
    }

    return originalResolveFilename.apply(this, arguments);
  };

  return () => {
    enabled = false;
  }
}

module.exports = nameResolution;