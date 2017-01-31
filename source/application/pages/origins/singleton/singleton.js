import store from 'store'
import originService from 'services/origins'

export default {
    components: {
        'layout': require('layouts/default/default.vue'),
        'resource': require('components/resource/resource.vue')
    },

    created: function() {
        this.load(this.$route.params.id)
    },

    methods: {
        load(id) {
            originService.find(id).then(() => {
                this.origin = store.state.origins.all[id]

                originService.findTargets(id).then(() => {
                    this.targets = store.getters.getTargets(this.origin.targets)
                })

                originService.findHealthHistory(id).then((history) => {
                    history.forEach(health => {
                        this.options.series[0].data.push(health.statistic_health_score)
                        this.options.xAxis.categories.push(health.health_dtm)
                    })
                }).then(() => this.edgeExtend(this.$refs.highcharts.chart))
            })
        },

        edgeExtend(chart) {
            var self = chart

            chart.series.map(function(series) {
                // Get inner-chart box
                var box = self.plotBox

                // Take areas path
                var areaPath = series.areaPath

                // Add start point
                // Right after the first element (M)
                areaPath.splice(1, 0, 0, areaPath[2], 'L')

                // Add Last points upper area end
                // Remove penultimate point
                // Replace it with a new point reaching to the width of chart and growing to the height of last element
                // And add the bottom-right corner
                areaPath.splice(-6, 3, 'L', box.width, areaPath[areaPath.length - 7], 'L', box.width, box.height)

                // Make the last points X be zero - that will result in bottom left corner
                areaPath[areaPath.length - 2] = 0

                // Replace value (redraw)
                series.area.element.attributes.d.value = areaPath.join(' ')
                var graphPath = series.graphPath

                // Add start point
                // Right after the first element (M)
                graphPath.splice(1, 0, 0, graphPath[2], 'L')

                // Add end point
                graphPath.push('L', box.width, graphPath[graphPath.length - 1])
                series.graph.element.attributes.d.value = graphPath.join(' ')
            })
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'clients:health')

        delete this.$options.sockets['origins:health']
        delete this.$options.sockets['targets:health']
    },

    sockets: {
        'origins:health': function(response) {
            if (this.origin) {
                const singletonHealth = response.data.find(health => health.id === this.$route.params.id) || false
                if (singletonHealth) {
                    store.dispatch('setOriginHealth', {
                        id: this.$route.params.id,
                        health: singletonHealth.health
                    })
                }
            }
        },
        'targets:health': function(response) {
            if (this.origin && this.targets.length > 0 && response.data.length > 0) {
                store.dispatch('setTargetsHealth', response.data.filter(
                    health => this.origin.targets.includes(health.id)
                ))
            }
        }
    },

    data() {
        return {
            // Page data
            origin: false,
            targets: [],
            health_history: [],

            // Chart configuration
            options: {
                chart: {
                    animation: true,
                    type: 'area',
                    spacingLeft: 0,
                    spacingRight: 0,
                    spacingTop: 0,
                    style: {
                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontSize: '12px'
                    }
                },
                tooltip: {
                    style: {
                        padding: 15,
                        fontWeight: 'bold'
                    }
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                xAxis: {
                    categories: [],
                    crosshair: {
                        color: "#e5e5e5",
                        width: 2,
                        zIndex: 2,
                        dashStyle: "shortdash"
                    },
                    startOnTick: false,
                    endOnTick: false,
                    gridLineWidth: 0,
                    minPadding: 0,
                    maxPadding: 0,
                    tickLength: 0
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        align: "left",
                        x: 10,
                        y: -8
                    },
                    startOnTick: false,
                    endOnTick: false,
                    softMax: 100,
                    softMin: 0
                },
                series: [{
                    name: 'Health',
                    data: [],
                    type: 'area',
                    color: "#2099ea",
                    lineWidth: 1,
                    dashStyle: "longdash",
                    fillOpacity: 0.08,
                    marker: {
                        fillColor: "#FFF",
                        lineColor: null,
                        lineWidth: 1.5,
                        width: 6,
                        height: 6,
                        radius: 3,
                        symbol: 'circle'
                    }
                }]
            }
        }
    }
}
