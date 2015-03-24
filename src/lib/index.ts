var tsc = require('typescript-compiler');

function metalsmithTypescript(option?: Option) {
  return function(files, metalsmith, done) {
    var result = tsc.compile(
      [metalsmith.source() + "/greeter.ts"],
      ["--outDir", metalsmith.destination()]);
    console.log(result);

    // remove ts files
    delete files["greeter.ts"];
    return done();
  }
}

interface Option {
  srcDir?: String;
  filenameFilter?: String;
  outDir?: String;
}

export = metalsmithTypescript
