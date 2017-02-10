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
        origin() { return this.$store.state.origins.all[this.$route.params.id] },


        // Chart configuration
        options() {
            return chartConstructor({
                series: [{ name: 'Health', data: this.health_history }]
            })
        }
    },

    created: function() {
        this.load(this.$route.params.id)
    },

    methods: {
        load(id) {
            // Autofill datacenter from store IF exists
            if (store.state.origins.all[id]) {
                this.origin = store.state.origins.all[id]

                // Autofill clusters from store IF exists
                if (store.state.origins.all[id].targets && store.state.origins.all[id].targets.length > 0) {
                    this.targets = store.getters.getTargets(store.state.origins.all[id].targets)
                }
            }

            // Retrieve origin from API
            originService.find(id).then(() => {
                this.origin = store.state.origins.all[id]

                // Retrieve targets from API
                originService.findTargets(id).then(() => {
                    this.targets = store.getters.getTargets(this.origin.targets)
                })

                // Retrieve health history from API
                originService.findHealthHistory(id).then((history) => {
                    this.health_history = history
                        .map(health => [
                            moment.utc(health.health_dtm).valueOf(),
                            health.statistic_health_score
                        ])
                        .sort((previous, current) => current[0] > previous[0] ? -1 : 1)
                })

                // Retrieve health history from API
                originService.findDispatchHistory(id).then((history) => { this.dispatches = history })
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
            dispatches: [],
            health_history: []
        }
    }
}
