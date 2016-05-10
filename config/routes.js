var controllers = require('../app/routes')

module.exports = function(app) {
    app.route('/').get(controllers.default.getDefault);
};
