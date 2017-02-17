import store from 'store'
import originService from 'services/origins'

export default {
    components: {
        'resource': require('components/resource/resource.vue')
    },

    computed: {
        origins () {
            return this.$store.state.origins.all
        }
    },

    mounted() {
        this.loadAll()
    },

    methods: {
        loadAll() {
            originService.findAll()
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'origins:health')
        delete this.$options.sockets['origins:health']
    },

    sockets: {
        'origins:health': function(response) {
            store.dispatch('setOriginsHealth', response.data)
        }
    }
}
