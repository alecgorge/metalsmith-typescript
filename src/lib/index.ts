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

// class PluginExecutor implements Option {
//   // default options
//   srcDir:String = "src/typescript/";
//   filenameFilter:String = "**/*.tsc";
//   outDir:String = "build/scripts/";
//
//   constructor(option?: Option) {
//     if(option) {
//       if(option.srcDir) { this.srcDir = option.srcDir }
//       if(option.filenameFilter) { this.filenameFilter = option.filenameFilter }
//       if(option.outDir) { this.outDir = option.outDir }
//     }
//   }
//
//   targetFiles() {
//     // return this.srcDir + this.filenameFilter;
//   }
//
//   compileOption() {
//
//   }
//
//   // compile: (files, metalsmith, done) => any = function(files, metalsmith, done) {
//   //   return done();
//   // }
// }


export = metalsmithTypescript
