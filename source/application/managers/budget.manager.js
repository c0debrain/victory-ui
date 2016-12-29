angular.module('app.managers')
    .factory('managers.budget', BudgetManager)

BudgetManager.$inject = [
    'environment',
    '$http',
    '$q',
    'models.budget',
    'managers.category'
]

/**
 * We are injecting the model simply as "Instance" so that we can use the
 * same template for all models throughout the front-end. This will make
 * copying code across files much easier.
 */
function BudgetManager(
    Environment,
    $http,
    $q,
    Instance,
    CategoryManager
) {
    var manager = {
        /* Class properties */
        _pool: {},


        /* Private Methods */
        _retrieveInstance: function(id, data) {
            var instance = this._pool[id]

            if (instance) {
                instance.setData(data)

            } else {
                instance = new Instance(data)
                this._pool[id] = instance
            }

            return instance
        },

        _search: function(id) {
            return this._pool[id]
        },

        _load: function(id, deferred) {
            var scope = this

            $http.get(Environment.api.path + '/budgets/self/' + id)
                .then(function(response) {
                    var instance = scope._retrieveInstance(response.data.id, response.data)
                    deferred.resolve(instance)
                })
                .catch(function() {
                    deferred.reject()
                })
        },


        /* Public Methods */
        /* Use this function in order to get an instance by it's id */
        get: function(id) {
            var deferred = $q.defer()
            var data = this._search(id)

            if (data) {
                deferred.resolve(data)
            } else {
                this._load(id, deferred)
            }

            return deferred.promise
        },

        /* Use this function in order to get instances of all the instances */
        loadAll: function() {
            var deferred = $q.defer()
            var scope = this

            $http.get(Environment.api.path + '/budgets/self')
                .then(function(response) {
                    var collection = []

                    response.data.forEach(function(data) {
                        var instance = scope._retrieveInstance(data.id, data)
                        collection.push(instance)
                    })

                    deferred.resolve(collection)
                })
                .catch(function(error) {
                    console.error(error)
                    deferred.reject()
                })

            return deferred.promise
        },

        create: function(data, category) {
            var deferred = $q.defer()
            var scope = this

            $http.post(Environment.api.path + '/budgets/self', data)
                .then(function(response) {
                    if (category) {
                        response.data.category = category
                    }

                    var instance = scope.set(response.data)
                    deferred.resolve(instance)
                })
                .catch(function(error) {
                    console.error(error)
                    deferred.reject()
                })

            return deferred.promise
        },

        /*
            This function is useful when we got somehow the instance data and we wish to
            store it or update the pool and get an instance in return
        */
        set: function(data) {
            var scope = this
            var instance = this._search(data.id)

            if (data.category) {
                data.category = CategoryManager.set(data.category)
            }

            if (instance) {
                instance.setData(data)

            } else {
                instance = scope._retrieveInstance(data.id, data)
            }

            return instance
        },

        update: function(data) {
            var deferred = $q.defer()
            var scope = this
            var instance = data

            /**
             * I have absolutely no idea why, but we have to use angular.copy on the Budget
             * that is getting created. This fixes a bug when changing the Budget's interval
             * where the start and end date would get wiped because they aren't part of the
             * interval picker object. Using angular.extend would work, but somewhere between
             * here and the HTTP request below they're wiped. I'm clueless.
             */
            $http.put(Environment.api.path + '/budgets/self/' + data.id, angular.copy(data))
                .then(function(response) {
                    if (response.data.category) {
                        response.data.category = CategoryManager.set(response.data.category)
                    }

                    instance.setData(response.data)
                    deferred.resolve(instance)
                })
                .catch(function(error) {
                    console.error(error)
                    deferred.reject()
                })

            return deferred.promise
        },


        delete: function(id) {
            var scope = this

            $http.delete(Environment.api.path + '/budgets/self/' + id)
                .then(function(response) {
                    if (response.status === 200) {
                        delete scope._pool[id]
                        return true
                    }

                    return false
                })
                .catch(function(error) {
                    console.error(error)
                })
        }
    }

    return manager
}
