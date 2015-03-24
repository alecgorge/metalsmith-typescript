/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../typings/metalsmith/metalsmith.d.ts" />
/// <reference path="../typings/assert-dir-equal/assert-dir-equal.d.ts" />
/// <reference path="../../lib/index.ts" />
var typescript = require('../../lib/index');
var chai = require('chai');
var expect = chai.expect;
var Metalsmith = require('metalsmith');
var assertDirEqual = require('assert-dir-equal');
describe('plugin module unit test:', function () {
    describe('without option', function () {
        it('compile tsc files out to build directory', function (done) {
            var routeDir = "./test/fixtures/withoutoptions";
            new Metalsmith(routeDir).use(typescript()).build(function (err) {
                console.log(err);
                assertDirEqual(routeDir + "/build", routeDir + "/expected");
                done();
            });
        });
        it('compile nested tsc files out to build directory', function (done) {
            var routeDir = "./test/fixtures/nestedscripts";
            new Metalsmith(routeDir).use(typescript()).build(function (err) {
                assertDirEqual(routeDir + "/build", routeDir + "/expected");
                done();
            });
        });
    });
    describe('compile error handling', function () {
        var routeDir = "./test/fixtures/withcompileerror";
        it('callback with compile error', function (done) {
            new Metalsmith(routeDir).use(typescript()).build(function (err) {
                expect(err).not.to.null;
                done();
            });
        });
    });
    describe('with options', function () {
        it('output file to target dir by option', function (done) {
            var routeDir = "./test/fixtures/withoutdiroption";
            new Metalsmith(routeDir).use(typescript({
                outDir: "target"
            })).build(function (err) {
                assertDirEqual(routeDir + "/target", routeDir + "/expected");
                assertDirEqual(routeDir + "/build", routeDir + "/expectedbuild");
                done();
            });
        });
    });
});
