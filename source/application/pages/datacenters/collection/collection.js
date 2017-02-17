import store from 'store'
import datacenterService from 'services/datacenters'

export default {
    components: {
        'resource': require('components/resource/resource.vue')
    },

    data() {
        return {
            title: 'Datacenters'
        }
    },

    computed: {
        datacenters () {
            return this.$store.state.datacenters.all
        }
    },

    mounted() {
        this.loadAll()
    },

    methods: {
        loadAll() {
            datacenterService.findAll()
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'datacenters:health')
        delete this.$options.sockets['datacenters:health']
    },

    sockets: {
        'datacenters:health': function(response) {
            store.dispatch('setDatacentersHealth', response.data)
        }
    }
}
