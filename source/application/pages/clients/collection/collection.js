import store from 'store'
import clientService from 'services/clients'

export default {
    components: {
        'resource': require('components/resource/resource.vue')
    },

    data() {
        return {
            tabs: [{
                name: 'Collection',
                view: 'clients.collection'
            }]
        }
    },

    computed: {
        clients () {
            return this.$store.state.clients.all
        }
    },

    mounted() {
        this.loadAll()
    },

    methods: {
        loadAll() {
            clientService.findAll()
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
