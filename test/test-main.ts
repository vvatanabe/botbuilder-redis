/// <reference path="../typings/index.d.ts" />

import assert = require('power-assert');
import fakeredis = require("fakeredis");
import Promise = require("bluebird");
import RedisStorage = require('../src/main');

describe("main", () => {

  before(() => {

  });

  after(() => {

  });

  beforeEach(done => {
    done();
  });

  afterEach(done => {
    done();
  });

  it("can be storage", done => {
    const storage = new RedisStorage(fakeredis.createClient());
    const save = Promise.promisify<any, any, any>(storage.save, { context: storage });
    const get = Promise.promisify<any, any>(storage.get, { context: storage });
    const del = Promise.promisify<any, any>(storage.delete, { context: storage });
    assert('99999999' === storage.createKey('99999999'));
    save('99999999', 123456)
      .then(() => {
        return get('99999999');
      })
      .then((data) => {
        assert(123456 === data);
        return del('99999999');
      })
      .then(() => {
        return get('99999999');
      })
      .then((data) => {
        assert(null == data);
        done();
      })
      .catch((err) => {
        throw err;
      })
  });

  it("can be storage with prefix", done => {
    const storage = new RedisStorage(fakeredis.createClient(), 'prefix');
    const save = Promise.promisify<any, any, any>(storage.save, { context: storage });
    const get = Promise.promisify<any, any>(storage.get, { context: storage });
    const del = Promise.promisify<any, any>(storage.delete, { context: storage });
    assert('prefix:99999999' === storage.createKey('99999999'));
    save('99999999', 123456)
      .then(() => {
        return get('99999999');
      })
      .then((data) => {
        assert(123456 === data);
        return del('99999999');
      })
      .then(() => {
        return get('99999999');
      })
      .then((data) => {
        assert(null == data);
        done();
      })
      .catch((err) => {
        throw err;
      })
  });

});
