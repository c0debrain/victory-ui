angular.module('app')
    .config(PromiseConfiguration)

PromiseConfiguration.$inject = [
    '$qProvider'
]

/**
 * This silences this issue with unhandled promise rejections:
 * https://github.com/angular-ui/ui-router/issues/2889
 */
function PromiseConfiguration(
    $qProvider
) {
    $qProvider.errorOnUnhandledRejections(false)
}
