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

// Config Paths
var paths = {
    config: './config/' + process.env.NODE_ENV,
    source: './source',
    pages:  './source/pages',
    assets: './source/assets',
    dist:   './dist'
};

/*
    Transpiles the framework's LESS files into CSS files.
 */
gulp.task('less', function() {
    gulp.src(path.join(paths.pages, '/less/pages.less'))
        .pipe(less({ compress: true }))
        .pipe(gulp.dest(path.join(paths.dist, '/pages/css')))
        .pipe(livereload());
});

/*
    Watches for changes in the source directory's LESS files. Transpiles them
    to CSS. This task makes sure the dist directory has been created first.
 */
gulp.task('watch', ['copy'], function() {
    livereload.listen();
    gulp.watch(paths.source + '/**/*.less', ['less']);
});

gulp.task('build', ['less', 'copy', 'config']);

/*
    Deletes the dist directory.
 */
gulp.task('clean', function() {
    return gulp.src(paths.dist, { read: false })
        .pipe(clean());
});


/*
    Duplicates files that aren't specifically ignored into the dist directory.
    Deletes the previous dist directory to prevent any collisions.
 */
gulp.task('copy', ['clean'], function() {
    return gulp.src(
        [
            paths.source + '/**',
            '!**/node_modules/**',
            '!**/node_modules/',
            '!.gitgnore',
            '!package.json',
            '!Gruntfile.js',
            '!gulpfile.js',
            '!app.js'
        ])
        .pipe(gulp.dest(paths.dist));
});

/*
    Minifies all default CSS assets in the dist directory. Does not effect
    the source directory.
    @TODO:  Actually implement this
 */
gulp.task('css-min', function() {
    return gulp.src([paths.dist + './assets/css/*.css', paths.dist + './pages/css/*.css'])
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
        .pipe(gulp.dest(paths.dist + '/assets/js'));
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
