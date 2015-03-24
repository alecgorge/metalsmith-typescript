/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../typings/metalsmith/metalsmith.d.ts" />
/// <reference path="../typings/assert-dir-equal/assert-dir-equal.d.ts" />
/// <reference path="../../lib/index.ts" />

import path = require('path');
// var rsolve = path.resolve;

import typescript = require('../../lib/index');

import chai = require('chai');

// var expect = chai.expect;

import Metalsmith = require('metalsmith');

import assertDirEqual = require('assert-dir-equal');

/** Unit tests */
describe('plugin module unit test:', () => {
  // default options
  describe('without option', () => {
      var routeDir = "./test/fixtures/withoutoptions";
      var builder = new Metalsmith(routeDir);

      it('compile tsc files out to build directory', (done) => {
        builder.use(typescript()).build((err) => {
          assertDirEqual(routeDir + "/build", routeDir + "/expected");
          done();
        });
      });
  });

  // with source directory option

  // with file pattern option

  // with output directory option

  // with multipule options

  // rename source directory with typescript


});
