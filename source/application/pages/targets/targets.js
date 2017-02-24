export default {
    components: {
        'content-header': require('components/content-header/content-header.vue')
    },

    data() {
        return {
            tabs: [{
                name: 'Collection',
                view: 'targets.collection'
            }, {
                name: 'Waterfall',
                view: 'targets.waterfall'
            }]
        }
    }
}