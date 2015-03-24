var tsc = require('typescript-compiler');
function metalsmithTypescript(option) {
    return function (files, metalsmith, done) {
        try {
            var plugin = new TypeScriptPlugin(metalsmith, option);
            var targetFiles = Object.keys(files).filter(plugin.filePattern);
            console.log(targetFiles);
            var result = tsc.compile(targetFiles.map(plugin.fileFullPath), [
                "--outDir",
                metalsmith.destination(),
                "--noEmitOnError"
            ]);
            if (result.errors) {
                return done(result.errors);
            }
            targetFiles.forEach(function (value, idx, arr) {
                return delete files[value];
            });
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
        this.regex = new RegExp(".*\.ts$");
        this.filePattern = function (value, idx, arr) {
            return _this.regex.test(value);
        };
        this.fileFullPath = function (value, idx, arr) {
            return _this.metalsmith.source() + "/" + value;
        };
        this.metalsmith = appSettings;
    }
    return TypeScriptPlugin;
})();
module.exports = metalsmithTypescript;
