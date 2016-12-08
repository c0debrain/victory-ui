// Environment Variables
var env = require('node-env-file')
env(__dirname + '/.environment/public.env')
env(__dirname + '/.environment/private.env')

// Global Dependencies
var express = require('express')
var colors = require('colors')

// Configuration
var config = require('./configuration')()

// Initialize Server
var app = express()

// Configure Middleware
config.middleware(app)

// Initialize Routes
app.route('/*').get(function(req, res, next) {
    res.sendFile('index.html', { root: __dirname + '/.build' })
})

// Execute Server
var server = app.listen(process.env.NODE_PORT, function() {
    console.log('Listening on port ' + process.env.NODE_PORT.blue + ' in a ' + process.env.NODE_ENV.blue + ' environment.')

}).on('error', function(e) {
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use. Is the server already running?'.red)
    }
})

module.exports = server
