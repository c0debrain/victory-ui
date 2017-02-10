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

    created: function() {
        this.load(this.$route.params.id)
    },

    methods: {
        load(id) {
            // Autofill datacenter from store IF exists
            if (store.state.datacenters.all[id]) {
                this.datacenter = store.state.datacenters.all[id]

                // Autofill clusters from store IF exists
                if (store.state.datacenters.all[id].clusters && store.state.datacenters.all[id].clusters.length > 0) {
                    this.clusters = store.getters.getClusters(store.state.datacenters.all[id].clusters)
                }
            }

            // Retrieve fresh data from API
            datacenterService.find(id).then(() => {
                this.datacenter = store.state.datacenters.all[id]

                datacenterService.findClusters(id).then(() => {
                    this.clusters = store.getters.getClusters(this.datacenter.clusters)
                })
            })
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'datacenters:health')

        delete this.$options.sockets['datacenters:health']
        delete this.$options.sockets['clusters:health']
    },

    sockets: {
        'datacenters:health': function(response) {
            if (this.datacenter) {
                const singletonHealth = response.data.find(health => health.id === this.$route.params.id) || false
                if (singletonHealth) {
                    store.dispatch('setDatacenterHealth', {
                        id: this.$route.params.id,
                        health: singletonHealth.health
                    })
                }
            }
        },
        'clusters:health': function(response) {
            if (this.datacenter && this.clusters.length > 0 && response.data.length > 0) {
                store.dispatch('setClustersHealth', response.data.filter(
                    health => this.datacenter.clusters.includes(health.id)
                ))
            }
        }
    },

    data() {
        return {
            datacenter: false,
            clusters: [],
            health: false,

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
                    data: [45, 45],
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
