var tsc = require('typescript-compiler');
function metalsmithTypescript(option) {
    return function (files, metalsmith, done) {
        try {
            var plugin = new TypeScriptPlugin(metalsmith, option);
            var targetFiles = Object.keys(files).filter(plugin.filePattern);
            var result = tsc.compile(targetFiles.map(plugin.fileFullPath), plugin.compileOptions());
            if (!result || result.errors.length > 0) {
                return done(result.errors);
            }
            // remove ts files
            targetFiles.forEach(function (value, idx, arr) { return delete files[value]; });
            return done();
        }
        catch (err) {
            return (done(err));
        }
    };
}
var TypeScriptPlugin = (function () {
    function TypeScriptPlugin(appSettings, option) {
        var _this = this;
        this.basefilenameReg = ".*\.ts$";
        this.compOptions = ["--noEmitOnError"];
        this.filePattern = function (value, idx, arr) {
            return _this.regex.test(value);
        };
        this.fileFullPath = function (value, idx, arr) {
            return _this.metalsmith.source() + "/" + value;
        };
        this.metalsmith = appSettings;
        this.destDir = option && option.outDir ?
            this.metalsmith.directory() + "/" + option.outDir : this.metalsmith.destination();
        this.regex = option && option.filter ?
            new RegExp(option.filter + this.basefilenameReg) : new RegExp(this.basefilenameReg);
        if (option && option.moduleType) {
            this.moduleType = option.moduleType;
        }
        if (option && option.compilerOptions) {
            this.compOptions = this.compOptions.concat(option.compilerOptions);
        }
    }
    TypeScriptPlugin.prototype.compileOptions = function () {
        this.compOptions.push("--outDir", this.destDir);
        if (this.moduleType) {
            this.compOptions.push("--module", this.moduleType);
        }
        return this.compOptions;
    };
    return TypeScriptPlugin;
})();
module.exports = metalsmithTypescript;
