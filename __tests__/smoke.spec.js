const {expect} = require('chai');
const Module = require('module');

const defaultResolvers = Object.assign({}, require.extensions);
describe('clear test', () => {
  beforeEach(() => {
    require._cache = {};
  });

  it('without default', () => {
    const withOutdefault = require('./withoutDefault')
    expect(withOutdefault.default).to.be.equal(undefined);
    expect(withOutdefault()).to.be.equal(42);
  });

  it('imports in modules', () => {
    expect(() => require('./node_modules/test')).to.throw();
  });
});

describe('mocked test', () => {
  beforeEach(() => {
    require._cache = Module._cache = {};
    require.extensions['.js'] = defaultResolvers['.js'];
  });

  it('without default', () => {
    require('../interop-require');
    const withOutdefault = require('./withoutDefault')
    expect(withOutdefault.default()).to.be.equal(42);
    expect(withOutdefault()).to.be.equal(42);
  });

  it('imports in modules', () => {
    const remove = require('../es_modules');
    require('./node_modules/test');
    expect(require('./node_modules/test').default).to.be.equal(42);
    remove();
    require._cache = Module._cache = {};
    expect(() => require('./node_modules/test')).to.throw();
  });

  it('should import aliases', () => {
    const {setAliases} = require('../');
    const remove = setAliases({
      'target': './d1',
      'common': './d2',
    });
    expect(require('target/1')).to.be.equal(1);
    expect(require('common/1')).to.be.equal(2);
    expect(require('./d1/1')).to.be.equal(1);
    expect(require('./d2/1')).to.be.equal(2);
    remove();
    expect(() => require('target/1')).to.throw();
  });
});