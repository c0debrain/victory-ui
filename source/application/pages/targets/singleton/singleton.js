import chartConstructor from 'utilities/chartConstructor'
import targetService from 'services/targets'
import store from 'store'

export default {
    components: {
        'resource': require('components/resource/resource.vue')
    },

    data() {
        return {
            dispatches: [],
            health_history: []
        }
    },

    computed: {
        target() { return this.$store.state.targets.all[this.$route.params.id] },


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
            if (store.state.targets.all[id]) this.target = store.state.targets.all[id]

            // Retrieve origin from API
            targetService.find(id).then(() => {
                this.target = store.state.targets.all[id]

                // Retrieve health history from API
                targetService.findHealthHistory(id).then((history) => {
                    this.health_history = history
                        .map(health => [
                            moment.utc(health.created_at).valueOf(),
                            health.score
                        ])
                        .sort((previous, current) => current[0] > previous[0] ? -1 : 1)
                })

                // Retrieve health history from API
                targetService.findDispatchHistory(id).then((history) => { this.dispatches = history })
            })
        }
    },

    destroyed() {
        // Kill socket listeners
        delete this.$options.sockets['targets:health']
    },

    sockets: {
        /**
         * Listen for new health for origin resources
         * @type {object} response
         */
        'targets:health': function(response) {
            if (this.target) {
                const singletonHealth = response.data.find(health => health.id === this.$route.params.id) || false

                // If this resource's health was found in the emitted values,
                // then updated store with the new data
                if (singletonHealth) {
                    store.dispatch('setTargetHealth', {
                        id: this.$route.params.id,
                        health: singletonHealth.health
                    })
                }
            }
        }
    }
}
