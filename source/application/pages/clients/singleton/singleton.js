import chartConstructor from 'utilities/chartConstructor'
import store from 'store'
import clientService from 'services/clients'

export default {
    components: {
        'resource': require('components/resource/resource.vue')
    },

    data() {
        return {
            origins: [],
            health: false,
        }
    },

    computed: {
        client () {
            return this.$store.state.clients.all[this.$route.params.id]
        },

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
            this.$socket.emit('client:health:history', id)

            clientService.find(id).then(() => {
                this.client = store.state.clients.all[id]

                clientService.findOrigins(id).then(() => {
                    this.origins = store.getters.getOrigins(this.client.origins)
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
        /**
         * Listen for new health for origin resources
         * @type {object} response
         */
        'origins:health': function(response) {
            if (this.target) {
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
        }
    }
}
