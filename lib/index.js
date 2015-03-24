var tsc = require('typescript-compiler');
function metalsmithTypescript(option) {
    return function (files, metalsmith, done) {
        console.log(files);
        try {
            var regex = new RegExp(".*\.ts$");
            var filepattern = function (value, idx, arr) {
                return regex.test(value);
            };
            var paths = Object.keys(files).filter(filepattern).map(function (value, idx, arr) {
                return metalsmith.source() + "/" + value;
            });
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
module.exports = metalsmithTypescript;
