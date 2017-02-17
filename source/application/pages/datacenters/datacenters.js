export default {
    components: {
        'content-header': require('components/content-header/content-header.vue')
    },

    data() {
        return {
            tabs: [{
                name: 'Collection',
                view: 'datacenters.collection'
            }]
        }
    }
}
