var settings        = require('./settings')
var path            = require('path');
var express         = require('express');
var helmet          = require('helmet');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

module.exports = function(app) {
    // Serve static content
    app.use(express.static(path.join(settings.path, 'dist')));
    app.use('/components', express.static(path.join(settings.path, 'bower_components')));

    // Parse the body of requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // I have no idea what this does but it was in here
    app.use(methodOverride('X-HTTP-Method-Override'));

    // Logging
    app.use(morgan('short'));

    // Security
    app.use(helmet());

    // Format Returned JSON Data
    app.set('json spaces', 4);

    app.use(function(req, res, next) {
        res.sendView = function(view) {
            return res.sendFile(path.join(settings.path, 'dist', view));
        }
        next();
    });

    // Enable CORS to avoid Cross Domain Origin issues
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        next();
    });
};
