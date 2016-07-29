var settings = require('./')().settings;

module.exports = function(app) {
    app.route('/*').get(function(req, res, next) {
        res.sendView('index.html', { root: settings.path + 'dist' });
    });
};
