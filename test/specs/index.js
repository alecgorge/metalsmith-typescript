/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../typings/metalsmith/metalsmith.d.ts" />
/// <reference path="../typings/assert-dir-equal/assert-dir-equal.d.ts" />
/// <reference path="../../lib/index.ts" />
var typescript = require('../../lib/index');
var Metalsmith = require('metalsmith');
var assertDirEqual = require('assert-dir-equal');
describe('plugin module unit test:', function () {
    describe('without option', function () {
        var routeDir = "./test/fixtures/withoutoptions";
        var builder = new Metalsmith(routeDir);
        it('compile tsc files out to build directory', function (done) {
            builder.use(typescript()).build(function (err) {
                assertDirEqual(routeDir + "/build", routeDir + "/expected");
                done();
            });
        });
    });
});
