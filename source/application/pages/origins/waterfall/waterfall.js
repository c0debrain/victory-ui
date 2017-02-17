import store from 'store'
import originService from 'services/origins'

export default {
    components: {
        'waterfall': require('vue-waterfall/lib/waterfall'),
        'waterfall-slot': require('vue-waterfall/lib/waterfall-slot'),
        'waterfall-resource': require('components/waterfall-resource/waterfall-resource.vue')
    },

    data() {
        return {
            origins: Object.keys(this.$store.state.origins.all)
                .filter(key => this.$store.state.origins.all[key].health !== false)
                .map(key => this.$store.state.origins.all[key])
                .sort((previous, current) => current.health > previous.health ? -1 : 1)
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
