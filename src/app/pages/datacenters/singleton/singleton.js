/* ============
 * Account Index Page
 * ============
 *
 * Page where the user can view the account information
 */

import store from 'store'
import datacenterService from 'services/datacenters'

export default {
    components: {
        'layout': require('layouts/default/default.vue'),
        'resource': require('components/resource/resource.vue')
    },

    data() {
        return {
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
                    name: 'Performance',
                    data: [99, 22, 33, 44, 55, 66, 77, 88, 99],
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
    },

    computed: {
        datacenter() {
            return store.state.datacenters.all[this.$route.params.id]
        }
    },

    mounted: function() {
        this.load(this.$route.params.id)
    },

    methods: {
        load(id) {
            datacenterService.find(id)
        }
    }
}
