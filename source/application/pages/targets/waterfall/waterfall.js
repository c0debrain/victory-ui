import store from 'store'
import targetService from 'services/targets'

export default {
    components: {
        'waterfall': require('vue-waterfall/lib/waterfall'),
        'waterfall-slot': require('vue-waterfall/lib/waterfall-slot'),
        'waterfall-resource': require('components/waterfall-resource/waterfall-resource.vue')
    },

    data() {
        return {
            targets: Object.keys(this.$store.state.targets.all)
                .filter(key => this.$store.state.targets.all[key].health !== false)
                .map(key => this.$store.state.targets.all[key])
                .sort((previous, current) => current.health > previous.health ? -1 : 1)
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
        console.log('Killing socket listener for: ', 'origins:health')
        delete this.$options.sockets['targets:health']
    },

    sockets: {
        'targets:health': function(response) {
            store.dispatch('setTargetsHealth', response.data)
        }
    }
}
