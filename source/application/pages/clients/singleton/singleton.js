import store from 'store'
import clientService from 'services/clients'

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
            this.$socket.emit('client:health:history', id)

            clientService.find(id).then(() => {
                this.client = store.state.clients.all[id]

                clientService.findOrigins(id).then(() => {
                    this.origins = store.getters.getOrigins(this.client.origins)
                    console.log('this.origins:', store.getters.getOrigins(this.client.origins), this.origins, this.client.origins, store.state.origins.all)
                })
            })
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'clients:health')

        delete this.$options.sockets['clients:health']
        delete this.$options.sockets['origins:health']
    },

    sockets: {
        'clients:health': function(response) {
            // console.log('datacenters:health event receieved: ', response)

            if (this.client) {
                store.dispatch('setClientHealth', {
                    id: this.$route.params.id,
                    health: response.data.find(health => {
                        return health.id === this.$route.params.id
                    }).health
                })
            }

        },
        'origins:health': function(response) {
            // console.log('clusters:health event receieved: ', response)

            if (this.client && this.origins.length > 0 && response.data.length > 0) {
                store.dispatch('setOriginsHealth', response.data.filter(
                    health => this.client.origins.includes(health.id)
                ))
            }
        }
    },

    data() {
        return {
            // Page data
            client: false,
            origins: [],

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
    }
}
