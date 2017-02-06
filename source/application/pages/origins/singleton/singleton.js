import chartConstructor from 'utilities/chartConstructor'
import edgeExtend from 'utilities/edgeExtend'
import originService from 'services/origins'
import store from 'store'

export default {
    components: {
        'layout': require('layouts/default/default.vue'),
        'resource': require('components/resource/resource.vue')
    },

    computed: {
        origin() {
            return this.$store.state.origins.all[this.$route.params.id]
        }
    },

    created: function() {
        this.load(this.$route.params.id)
    },

    methods: {
        load(id) {
            // Retrieve origin from API
            originService.find(id).then(() => {
                this.origin = store.state.origins.all[id]

                // Retrieve targets from API
                originService.findTargets(id).then(() => {
                    this.targets = store.getters.getTargets(this.origin.targets)
                })

                // Retrieve health history from API
                originService.findHealthHistory(id).then((history) => {

                    // Push health onto chart
                    history.forEach(health => {
                        this.options.series[0].data.push([moment(health.health_dtm).calendar(), health.statistic_health_score])
                        this.options.xAxis.categories.push(moment(health.health_dtm).format('hh:mm A'))
                    })

                // Extend chart edges beyond boundaries
                }).then(() => edgeExtend(this.$refs.highcharts.chart))
            })
        }
    },

    destroyed() {
        // Kill socket listeners
        delete this.$options.sockets['origins:health']
        delete this.$options.sockets['targets:health']
    },

    sockets: {
        /**
         * Listen for new health for origin resources
         * @type {object} response
         */
        'origins:health': function(response) {
            if (this.origin) {
                const singletonHealth = response.data.find(health => health.id === this.$route.params.id) || false

                // If this resource's health was found in the emitted values,
                // then updated store with the new data
                if (singletonHealth) {
                    store.dispatch('setOriginHealth', {
                        id: this.$route.params.id,
                        health: singletonHealth.health
                    })
                }
            }
        },

        /**
         * Listen for new health for target resources
         * @type {object} response
         */
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
