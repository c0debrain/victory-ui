import store from 'store'
import originService from 'services/origins'
import edgeExtend from 'utilities/edgeExtend'
import chartConstructor from 'utilities/chartConstructor'

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
                        this.options.series[0].data.push([moment(health.health_dtm).calendar(), health.statistic_health_score])
                        this.options.xAxis.categories.push(moment(health.health_dtm).format('hh:mm A'))
                    })
                }).then(() => edgeExtend(this.$refs.highcharts.chart))
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
            options: chartConstructor({
                series: [{
                    name: 'Health'
                }]
            })
        }
    }
}
