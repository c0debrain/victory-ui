import store from 'store'
import originService from 'services/origins'

export default {
    components: {
        'layout': require('layouts/default/default.vue'),
        'waterfall': require('vue-waterfall/lib/waterfall'),
        'waterfall-slot': require('vue-waterfall/lib/waterfall-slot'),
        'waterfall-resource': require('components/waterfall-resource/waterfall-resource.vue')
    },

    data() {
        return {
            title: 'Origins',
            tabs: [{
                name: 'Collection',
                view: 'origins.collection'
            }, {
                name: 'Waterfall',
                view: 'origins.waterfall'
            }],
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
