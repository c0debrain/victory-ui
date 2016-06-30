/*
    Use this directive together with ng-include to include a
    template file by replacing the placeholder element
*/
angular.module('app.directives')
    .directive('includeReplace', function() {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });
