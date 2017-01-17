import Vue from 'vue'

export default {
    props: ['abbreviation', 'name'],
    methods: {
        enterResource: function (resource) {
            Vue.router.push({
                name: 'datacenters.singleton',
                params: {
                    id: this.abbreviation
                }
            })
        }
    }
}
