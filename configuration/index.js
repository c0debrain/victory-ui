module.exports = function() {

    var environment = {
        production: {
            middleware:     require('./production/middleware')
        },
        development: {
            middleware:     require('./development/middleware')
        }
    }

    return environment[process.env.NODE_ENV]
}
