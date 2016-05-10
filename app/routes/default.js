var path = require('path');

module.exports = {
    getDefault: function(req, res, next) {
        res.sendView('index.html');
    }
};
