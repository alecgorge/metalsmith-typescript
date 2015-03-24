var tsc = require('typescript-compiler');

function metalsmithTypescript(option?: Option) {
  return function(files, metalsmith, done) {
    console.log(files);
    // matching file patterns
    try {
      var regex = new RegExp(".*\.ts$");
      var filepattern:(value: string, idx: number, arr: string[]) => boolean = (value, idx, arr) => {
        return regex.test(value);
      };
      var paths = Object.keys(files).filter(filepattern).map((value, idx, arr) => {return metalsmith.source() + "/" + value});

      console.log(paths);
    } catch(err) {
      return (done(err));
    }

    var result = tsc.compile(paths, ["--outDir", metalsmith.destination()]);

    if(result.errors) {
      return done(result.errors);
    }

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
