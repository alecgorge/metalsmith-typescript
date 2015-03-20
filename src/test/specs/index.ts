/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../lib/index.ts" />

import typescript = require('../../lib/index');

import chai = require('chai');

var expect = chai.expect;

/** Unit tests */
describe('plugin module unit test:', () => {
  describe('without option', () => {
      it('should be able to create instance', (done) => {
        expect(typescript()).to.not.null;
        done();
      });
  });
});

// TODO validate options
// TODO execute compile default option
// TODO execute compile with sourcedir option
// TODO execute compile with filepattern option
// TODO execute compile with outdir option
// TODO execute compile with all option
// TODO execute plugin function without option
// TODO execute plugin function with option
