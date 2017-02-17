import store from 'store'
import targetService from 'services/targets'

export default {
    components: {
        'resource': require('components/resource/resource.vue')
    },

    computed: {
        targets () {
            return this.$store.state.targets.all
        }
    },

    mounted() {
        this.loadAll()
    },

    methods: {
        loadAll() {
            targetService.findAll()
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'targets:health')
        delete this.$options.sockets['targets:health']
    },

    sockets: {
        'targets:health': function(response) {
            store.dispatch('setTargetsHealth', response.data)
        }
    }
}
