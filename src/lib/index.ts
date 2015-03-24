var tsc = require('typescript-compiler');

function metalsmithTypescript(option?: Option) {
  return function(files, metalsmith, done) {
    try {
      var plugin = new TypeScriptPlugin(metalsmith, option);

      var targetFiles = Object.keys(files).filter(plugin.filePattern);

      var result = tsc.compile(
        targetFiles.map(plugin.fileFullPath),
        plugin.compileOptions());

      if(!result || result.errors.length > 0) {
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
  private basefilenameReg = ".*\.ts$";
  private compOptions: string[] = ["--noEmitOnError"];
  private destDir: string;

  private metalsmith: any;
  private regex: any;

  constructor(appSettings: any, option?: Option) {
    this.metalsmith = appSettings;

    this.destDir = option && option.outDir ?
        this.metalsmith.directory() + "/" + option.outDir : this.metalsmith.destination();

    this.regex = option && option.filter ?
        new RegExp(option.filter + this.basefilenameReg) : new RegExp(this.basefilenameReg)
  }

  filePattern:(value: string, idx: number, arr: string[]) => boolean = (value, idx, arr) => {
    return this.regex.test(value);
  };

  fileFullPath:(value: string, idx: number, arr: string[]) => string = (value, idx, arr) => {
    return this.metalsmith.source() + "/" + value;
  };

  compileOptions() {
    this.compOptions.push("--outDir", this.destDir);

    return this.compOptions
  }
}

interface Option {
  outDir?: string;
  filter?: string;
}

export = metalsmithTypescript
