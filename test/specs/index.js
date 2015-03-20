/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../lib/index.ts" />
var typescript = require('../../lib/index');
var chai = require('chai');
var expect = chai.expect;
describe('plugin module unit test:', function () {
    describe('without option', function () {
        it('should be able to create instance', function (done) {
            expect(typescript()).to.not.null;
            done();
        });
    });
});
