function metalsmithTypescript(option?: Option) {
  return function(files, metalsmith, done) {
    return done();
  }
}

interface Option {
  srcDir?: String;
  filenameFilter?: String;
  outDir?: String;
}

export = metalsmithTypescript
