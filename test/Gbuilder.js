var Gbuilder = require('../index.js');

var builder = new Gbuilder({
    src: __dirname + '/src/',
    dest: __dirname + '/dest/'
});

builder.registerBuilder('**/*.js')
    .read()
    .pipe(Gbuilder.builder.jshint({
        configFile: __dirname + '/.jshintrc'
    }))
    .pipe(Gbuilder.builder.amd)
    .pipe(Gbuilder.builder.uglify)
    .write();

builder.registerBuilder('**/*.tpl')
    .read()
    .pipe(Gbuilder.builder.template)
    .pipe(Gbuilder.builder.amd)
    .pipe(Gbuilder.builder.uglify)
    .write();

builder.registerBuilder('**/version.js')
    .read()
    .pipe(Gbuilder.builder.version)
    .write();

builder.registerBuilder('**/*.png')
    .copy();

builder.registerBuilder('**/_*.scss', '**/_*.sass')
    .ignore();

builder.registerBuilder('**/*.scss', '**/*.sass')
    .read()
    .pipe(Gbuilder.builder.sass)
    .write();

builder.registerDefaultBuilder(Gbuilder.builder.fs.copy);

module.exports = builder;