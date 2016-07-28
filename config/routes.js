module.exports = function(app) {
    app.route('/').get(function(req, res, next) {
        res.sendView('index.html');
    });
};
