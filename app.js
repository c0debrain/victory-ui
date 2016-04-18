// Dependencies
//// Primary Modules
var express = require('express');
var app = express();
var http = require('http').Server(app);

//// Security & Authentication
var helmet = require('helmet');
var morgan = require('morgan');

// Logging
app.use(morgan('short'));

app.use(express.static('src'));

app.all('/', function(req, res) {
    res.sendFile('./src/index.html');
});

app.listen(3000);
console.log('App listening on port: 3000');
