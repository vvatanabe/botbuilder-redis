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

  it("can be all...", done => {

    const storage = new RedisStorage(fakeredis.createClient());

    const save = Promise.promisify<any, any, any>(storage.save, { context: storage });
    const get = Promise.promisify<any, any>(storage.get, { context: storage });
    const del = Promise.promisify<any, any>(storage.delete, { context: storage });

    save('example-1', 123456)
      .then(() => {
        return get('example-1');
      })
      .then((data) => {
        assert(123456 === data);
        return del('example-1');
      })
      .then(() => {
        return get('example-1');
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
