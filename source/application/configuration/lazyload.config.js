angular.module('app')
    .config(LazyloadConfiguration)

LazyloadConfiguration.$inject = [
    '$ocLazyLoadProvider'
]

function LazyloadConfiguration(
    $ocLazyLoadProvider
) {
    $ocLazyLoadProvider.config({
        debug: true,
        events: true,
        modules: [
            {
                name: 'highcharts',
                files: [
                    'components/highcharts/highcharts.js',
                    'components/highcharts-ng/dist/highcharts-ng.min.js'
                ],
                serie: true
            }
        ]
    })
}
