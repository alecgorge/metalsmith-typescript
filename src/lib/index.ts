var tsc = require('typescript-compiler');

function metalsmithTypescript(option?: Option) {
  return function(files, metalsmith, done) {
    var result = tsc.compile(
      metalsmith.source() + "/**/*.ts",
      ["--outDir", metalsmith.destination()]);
    console.log(result);
    return done();
  }
}

interface Option {
  srcDir?: String;
  filenameFilter?: String;
  outDir?: String;
}

export = metalsmithTypescript
