// Global Variables
require('dotenv').config();
process.env.NODE_ENV = (process.env.NODE_ENV || 'development');


// Global Dependencies
var config          = require('./config')();
var path            = require('path');
var gulp            = require('gulp');
var less            = require('gulp-less');
var clean           = require('gulp-clean');
var minifycss       = require('gulp-minify-css');
var gulpNgConfig    = require('gulp-ng-config');
var b2v             = require('buffer-to-vinyl');
var bower           = require('gulp-bower');
var livereload      = require('gulp-livereload');
var webserver       = require('gulp-webserver');
var opn             = require('opn');
var nodemon         = require('nodemon');


// Config Variables --------------------------------------------
var paths = {
    config: './config/' + process.env.NODE_ENV,
    source: './source',
    pages:  './source/pages',
    assets: './source/assets',
    dist:   './dist'
};

var task = {
    less: {}
};

var ignoredFiles = [
    // Source Directory
    paths.source + '/**',

    // Not dependencies
    '!**/node_modules/',
    '!**/node_modules/**',

    // Not process file
    '!app.js',

    // Not build files
    '!.gitgnore',
    '!package.json',
    '!Gruntfile.js',
    '!gulpfile.js',

    // Not LESS directories
    '!**/**/less/',
    '!**/**/less/**'
];

// Gulp Tasks --------------------------------------------------

/*
    Transpiles the framework's LESS files into CSS files.
 */
gulp.task('less.framework', task.less.framework = function() {
    gulp.src(path.join(paths.pages, '/less/pages.less'))
        .pipe(less({ compress: false }))
        .pipe(gulp.dest(path.join(paths.dist, '/pages/css')))
        .pipe(livereload());
});
gulp.task('less.framework:copy', ['copy'], task.less.framework);


/*
    Transpiles the application's LESS files into CSS files.
 */
gulp.task('less.application', task.less.application = function() {
    gulp.src(path.join(paths.assets, '/less/styles.less'))
        .pipe(less({ compress: false }))
        .pipe(gulp.dest(path.join(paths.dist, '/assets/css')))
        .pipe(livereload());
});
gulp.task('less.application:copy', ['copy'], task.less.application);


/*
    Watches for changes in the source directory's LESS files. Transpiles them
    to CSS. This task makes sure the dist directory has been created first.
 */
gulp.task('watch', task.watch = function() {
    livereload.listen({ port: 35729 });

    gulp.watch(paths.source + '/pages/less/*.less', ['less.framework']);
    gulp.watch(paths.source + '/assets/less/*.less', ['less.application']);

    // Reload on HTML changes
    gulp.watch([
        paths.source + '/*.html',
        paths.source + '/tpl/*.html',
        paths.source + '/tpl/**/*.html'
    ], ['overwrite']);

    // Reload on JS changes
    gulp.watch([
        paths.source + '/*.js',
        paths.source + '/**/*.js',
        paths.source + '/**/**/*.js'
    ], ['overwrite']);
});
gulp.task('watch:copy', ['copy'], task.watch);
gulp.task('watch:server', ['server'], task.watch);


/*
    Deletes the dist directory.
 */
gulp.task('clean', task.clean = function() {
    return gulp.src(paths.dist, { read: false })
        .pipe(clean());
});


/*
    Duplicates files that aren't specifically ignored into the dist directory.
    Deletes the previous dist directory to prevent any collisions.
 */
gulp.task('copy', ['clean'], task.copy = function() {
    return gulp.src(ignoredFiles)
        .pipe(gulp.dest(paths.dist))
        .pipe(livereload());
});


/*
    Overwrites files in the dist directory with files from the source
    directory. Primarily intended to be used by livereload.
 */
gulp.task('overwrite', task.overwrite = function() {
    return gulp.src(ignoredFiles)
        .pipe(gulp.dest(paths.dist, { overwrite: true }))
        .pipe(livereload());
});


/*
    Generates environment variables that are to be injected into the Angular
    application at runtime.
 */
gulp.task('config', task.config = function() {
    var json = JSON.stringify({
        environment: {
            api: {
                protocol:       process.env.API_PROTOCOL,
                host:           process.env.API_HOST,
                version:        process.env.API_VERSION,
                port:           process.env.API_PORT,
                key:            process.env.API_KEY
            },
            dashboard: {
                protocol:       process.env.NODE_PROTOCOL,
                host:           process.env.NODE_HOST,
                environment:    process.env.NODE_ENV,
                port:           process.env.NODE_PORT
            }
        }
    });

    return b2v.stream(new Buffer(json), 'environment.js')
        .pipe(gulpNgConfig('app.environment', { pretty: true }))
        .pipe(gulp.dest(paths.dist + '/assets/js'));
});
gulp.task('config:copy',['copy'], task.config);


/*
    Run all necessary commands to build the application.
 */
gulp.task('build',
    [
        'copy',
        'less.framework:copy',
        'less.application:copy',
        'config:copy'
    ]
);


/*
    Use Nodemon to deploy the server.
 */
gulp.task('server', ['build'], function() {
    nodemon({
        script: 'app.js',
        ext: 'js html'
    });
});


/*
    Open the application in a browser window, after it has been served and the
    watcher process has been initiated.
 */
gulp.task('open:browser', ['server', 'watch'], function() {
    opn('http://' + process.env.NODE_HOST + ':' + process.env.NODE_PORT);
});


/*
    Run all necessary tasks to deploy the application in development mode
    with LiveReload enabled.
 */
gulp.task('serve', ['server', 'watch:server', 'open:browser']);


/*
    List all of the available commands.
 */
gulp.task('default', function() {
    console.log("\n");
    console.log("-------------------------------------------");
    console.log("| Command        | Calls                  |");
    console.log("-------------------------------------------");
    console.log("| gulp less      |                        |");
    console.log("| gulp watch     | [ less ]               |");
    console.log("| gulp build     | [ less, copy, css-min] |");
    console.log("| gulp clean     |                        |");
    console.log("| gulp copy      | [ clean ]              |");
    console.log("| gulp css-min   |                        |");
    console.log("| gulp config    |                        |");
    console.log("-------------------------------------------");
    console.log("\n");
});
