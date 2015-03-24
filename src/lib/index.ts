var tsc = require('typescript-compiler');

function metalsmithTypescript(option?: Option) {
  return function(files, metalsmith, done) {
    console.log(files);
    // matching file patterns
    try {
      var plugin = new TypeScriptPlugin(metalsmith, option);
      var paths = Object.keys(files).filter(plugin.filePattern).map(plugin.fileFullPath);

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

class TypeScriptPlugin {
  private regex = new RegExp(".*\.ts$");
  private metalsmith: any;

  constructor(appSettings: any, option: Option) {
    this.metalsmith = appSettings;
  }

  filePattern:(value: string, idx: number, arr: string[]) => boolean = (value, idx, arr) => {
    return this.regex.test(value);
  };

  fileFullPath:(value: string, idx: number, arr: string[]) => string = (value, idx, arr) => {
    return this.metalsmith.source() + "/" + value;
  };
}

interface Option {
  srcDir?: String;
  filenameFilter?: String;
  outDir?: String;
}

export = metalsmithTypescript
