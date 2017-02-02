import store from 'store'
import clientService from 'services/clients'

export default {
    components: {
        'layout': require('layouts/default/default.vue'),
        'resource': require('components/resource/resource.vue')
    },

    data() {
        return {
            clients: false
        }
    },

    mounted() {
        this.loadAll()
    },

    methods: {
        loadAll() {
            // this.$Progress.start()
            clientService.findAll().then(() => {
                this.clients = store.state.clients.all
            })
            // .then(this.$Progress.finish())
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'clients:health')
        delete this.$options.sockets['clients:health']
    },

    sockets: {
        'clients:health': function(response) {
            // console.log('datacenters:health event receieved: ', response)
            store.dispatch('setClientsHealth', response.data)
        }
    }
}
