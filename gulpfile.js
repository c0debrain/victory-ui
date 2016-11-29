// Environment Variables
var env = require('node-env-file')
env(__dirname + '/.environment/public.env')
env(__dirname + '/.environment/private.env')

// Dependencies
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
var changed         = require('gulp-changed');
var jshint          = require('gulp-jshint');
var sourcemaps      = require('gulp-sourcemaps');


// Config Variables --------------------------------------------
var paths = {
    dist:           './dist',
    source:         './source',
    assets:         './source/assets',
    templates:      './source/templates',
    application:    './source/application'
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
    Transpiles the application's LESS files into CSS files.
 */
gulp.task('less', task.less = function() {
    gulp.src(path.join(paths.assets, '/less/application.less'))
        .pipe(sourcemaps.init())
        .pipe(less({ compress: false }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(paths.dist, '/assets/css')))
        .pipe(livereload());
});
gulp.task('less:copy', ['copy'], task.less);


/*
    Watches for changes in the source directory's LESS files. Transpiles them
    to CSS. This task makes sure the dist directory has been created first.
 */
gulp.task('watch', task.watch = function() {
    livereload.listen({ port: 35729 });

    // Reload on LESS changes
    gulp.watch([
        paths.source + '/assets/less/*.less',
        paths.source + '/assets/less/**/*.less',
        paths.source + '/assets/less/**/**/*.less'
    ], ['less']);

    // Reload on HTML & JS changes
    gulp.watch([
        // Root application directory & framework JS
        paths.source        + '/*.html',
        paths.assets        + '/js/*.js',

        // Templates
        paths.templates     + '/*.html',
        paths.templates     + '/**/*.html',
        paths.templates     + '/**/**/*.html',

        // Application
        paths.application   + '/*.js',
        paths.application   + '/**/*.js',
        paths.application   + '/**/**/*.js'
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
    Checks for errors in syntax.
 */
gulp.task('lint', task.lint = function() {
    return gulp.src([
            paths.application + '/*.js',
            paths.application + '/**/*.js',
            paths.application + '/**/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
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
        .pipe(changed(paths.dist))
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
                path:           process.env.API_PROTOCOL + '://' + process.env.API_HOST + (process.env.NODE_ENV != 'production' ? ':' + process.env.API_PORT : '') + '/' + process.env.API_VERSION,
                protocol:       process.env.API_PROTOCOL,
                host:           process.env.API_HOST,
                version:        process.env.API_VERSION,
                port:           process.env.API_PORT,
                key:            process.env.API_KEY
            },
            dashboard: {
                path:           process.env.NODE_PROTOCOL + '://' + process.env.NODE_HOST + (process.env.NODE_ENV != 'production' ? ':' + process.env.NODE_PORT : '') + '/',
                protocol:       process.env.NODE_PROTOCOL,
                host:           process.env.NODE_HOST,
                environment:    process.env.NODE_ENV,
                port:           process.env.NODE_PORT
            }
        }
    });

    return b2v.stream(new Buffer(json), 'environment.js')
        .pipe(gulpNgConfig('app.environment', { pretty: true }))
        .pipe(gulp.dest(paths.dist + '/application'));
});
gulp.task('config:copy',['copy'], task.config);


/*
    Run all necessary commands to build the application.
 */
gulp.task('build',
    [
        'copy',
        'less:copy',
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
gulp.task('serve', ['server', 'watch:server'], function() {
    setTimeout(function() {
        opn('http://' + process.env.NODE_HOST + ':' + process.env.NODE_PORT);
    });
});
