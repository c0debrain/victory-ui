angular.module('app')
    .run(EditableConfiguration)

EditableConfiguration.$inject = [
    'editableOptions',
    'editableThemes'
]

function EditableConfiguration(
    editableOptions,
    editableThemes
) {
    // Set `default` theme
    editableOptions.theme = 'default'

    // Overwrite submit button template
    editableThemes['default'].submitTpl = '<button class="fa fa-check"></button>'
    editableThemes['default'].cancelTpl = '<button class="fa fa-times" ng-click="$form.$cancel()"></button>'
}
