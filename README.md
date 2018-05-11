# require-control [![Build Status](https://secure.travis-ci.org/theKashey/require-control.svg)](http://travis-ci.org/theKashey/require-control)

This is a module-in-the-middle, require hack, path control, this is just a toolbox to master nodejs modules.

- Fast relief againts the imports inside your node_modules. 
- A cure from "something.`default` is not a thing".
- A way to tame module name resolution.

# API
- All commands returns a function to cancel side effects.
- All commands could be run as many times as you wish, but only name resolution will make sense.

1. To cure all `imports` nodejs could look inside packages, stored out of sight of babel, inside node_modules
```js
import 'require-control/register';
```
And then all `imports` inside node_modules will work

2. To make your project _webpack-compact_ by forcing `.default` to exist on exports
```js
import 'require-control/webpackDefault';
```
And then default will _always_ exists.

3. To create a loop-aware module cache
```js
import {mirrorModuleCache} from 'require-control';
mirrorModuleCache((requireName, absoluteFilePath) => boolean);
```
And that will change how cache works for the selected files.

4. To control path resolution
```js
import {nameResolution} from 'require-control';
nameResolution((requireName, parent) => newFileName);

import {setAliases} from 'require-control';
setAliases({
  'from': 'to'
});
```
And then all module aliases (webpack resolve, ts paths, aliases, anything)

PS: You can use setAliases to achieve 10-100 speedup against tsconfig-paths, if you are not using "complex" typescript paths. 

# Licence
MIT
