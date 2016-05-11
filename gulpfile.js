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

// Config Paths
config.paths = {
    config: './config/' + process.env.NODE_ENV,
    source: './app/src',
    pages:  './app/src/pages',
    assets: './app/src/assets',
    build:  './dist'
};


/*
    Transpiles the framework's LESS files into CSS files.
 */
gulp.task('less', function() {
    gulp.src(config.paths.pages + '/less/pages.less')
        .pipe(less({
            paths: [
                config.paths.pages + '/less/'
            ]
        }))
        .pipe(gulp.dest(config.paths.pages + '/css/'));

    gulp.src(config.paths.assets + '/less/style.less')
        .pipe(less({
            paths: [
                config.paths.assets + '/less/'
            ]
        }))
        .pipe(gulp.dest(config.paths.assets + '/css/'));
});

/*
    Watches for changes in the source directory's LESS files. Transpiles them
    to CSS. This task does not copy them to the dist directory.
 */
gulp.task('watch', function() {
    gulp.watch([
        config.paths.pages + '/less/*.less',
        config.paths.assets + '/less/*.less'
    ], ['less']);
});

gulp.task('build', ['config', 'less', 'copy', 'css-min']);

/*
    Deletes the dist directory.
 */
gulp.task('clean', function() {
    return gulp.src(config.paths.build + '', { read: false })
        .pipe(clean());
});


/*
    Duplicates files that aren't specifically ignored into the dist directory.
    Deletes the previous dist directory to prevent any collisions.
 */
gulp.task('copy', ['clean'], function() {
    return gulp.src(
        [
            config.paths.source + '/**',
            '!**/node_modules/**',
            '!**/node_modules/',
            '!.gitgnore',
            '!package.json',
            '!Gruntfile.js',
            '!gulpfile.js',
            '!app.js'
        ])
        .pipe(gulp.dest(config.paths.build + ''));
});

/*
    Minifies all default CSS assets in the build directory. Does not effect
    the source directory.
 */
gulp.task('css-min', function() {
    return gulp.src([config.paths.build + './assets/css/*.css', config.paths.build + './pages/css/*.css'])
        .pipe(minifycss());
});

/*
    Generates environment variables that are to be injected into the Angular
    application at runtime.
 */
gulp.task('config', function() {
    var json = JSON.stringify({
        env: {
            api:            process.env.API,
            api_key:        process.env.API_KEY,
            api_version:    process.env.API_VERSION,
            node_env:       process.env.NODE_ENV,
            node_port:      process.env.NODE_PORT
        }
    });

    return b2v.stream(new Buffer(json), 'environment.js')
        .pipe(gulpNgConfig('app.env', { pretty: true }))
        .pipe(gulp.dest(config.paths.source + '/assets/js'));
});

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
