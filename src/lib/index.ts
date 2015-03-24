var tsc = require('typescript-compiler');

function metalsmithTypescript(option?: Option) {
  return function(files, metalsmith, done) {
    try {
      var plugin = new TypeScriptPlugin(metalsmith, option);

      var targetFiles = Object.keys(files).filter(plugin.filePattern);

      console.log(targetFiles);

      var result = tsc.compile(
        targetFiles.map(plugin.fileFullPath),
        ["--outDir", metalsmith.destination(),
         "--noEmitOnError"]);

      if(result.errors) {
        return done(result.errors);
      }

      // remove ts files
      targetFiles.forEach((value, idx, arr) => delete files[value]);

      return done();
    } catch(err) {
      return (done(err));
    }
  }
}

class TypeScriptPlugin {
  private regex = new RegExp(".*\.ts$");
  private metalsmith: any;

  constructor(appSettings: any, option?: Option) {
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
  outDir?: String;
}

export = metalsmithTypescript
