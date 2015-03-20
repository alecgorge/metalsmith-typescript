/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../lib/index.ts" />

import typescript = require('../../lib/index');

import chai = require('chai');

var middleware = new typescript.Middleware({});

function hoge() {
  return "";
}
