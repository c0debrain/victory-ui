import store from 'store'
import originService from 'services/origins'

export default {
    components: {
        'layout': require('layouts/default/default.vue'),
        'waterfall': require('vue-waterfall/lib/waterfall'),
        'waterfall-slot': require('vue-waterfall/lib/waterfall-slot'),
        'waterfall-resource': require('components/waterfall-resource/waterfall-resource.vue')
    },

    computed: {
        origins () {
            const origins = this.$store.state.origins.all
            return Object.keys(origins)
                .filter(key => origins[key].health !== false)
                .map(key => origins[key])
        }
    },

    mounted() {
        this.loadAll()
    },

    methods: {
        loadAll() {
            originService.findAll().then(() => {
                this.origins = store.state.origins.all
            })

            console.log('this.$store', this.$store)
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
