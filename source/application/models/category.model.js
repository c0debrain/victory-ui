angular.module('app.models')
    .factory('models.category', CategoryModel)

CategoryModel.$inject = [
    '$http',
    '$q'
]

function CategoryModel(
    $http,
    $q
) {
    function Category(data) {
        if (data) {
            this.setData(data)
        }
    }

    Category.prototype = {
        setData: function(data) {
            angular.extend(this, data)
        }
    }

    return Category
}
