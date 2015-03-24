var tsc = require('typescript-compiler');
function metalsmithTypescript(option) {
    return function (files, metalsmith, done) {
        console.log(files);
        try {
            var plugin = new TypeScriptPlugin(metalsmith, option);
            var paths = Object.keys(files).filter(plugin.filePattern).map(plugin.fileFullPath);
            console.log(paths);
        }
        catch (err) {
            return (done(err));
        }
        var result = tsc.compile(paths, [
            "--outDir",
            metalsmith.destination()
        ]);
        if (result.errors) {
            return done(result.errors);
        }
        delete files["greeter.ts"];
        return done();
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
