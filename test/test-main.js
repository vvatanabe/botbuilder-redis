'use strict';

const assert = require('power-assert');
import RedisStorage from '../src/main';

describe("main", () => {

  if (global.mocha) {
    global.mocha.globals(['*']);
  }

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

  it("can be test.", done => {
    const a = 1;
    assert(a === 1);
    done();
  });

});
