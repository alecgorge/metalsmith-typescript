var tsc = require('typescript-compiler');
function metalsmithTypescript(option) {
    return function (files, metalsmith, done) {
        var result = tsc.compile([
            metalsmith.source() + "/greeter.ts"
        ], [
            "--outDir",
            metalsmith.destination()
        ]);
        console.log(result);
        delete files["greeter.ts"];
        return done();
    };
}
module.exports = metalsmithTypescript;
