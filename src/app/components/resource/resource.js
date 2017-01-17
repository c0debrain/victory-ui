import Vue from 'vue'

export default {
    props: ['abbreviation', 'name'],
    methods: {
        enterResource: function (resource) {
            console.log("sup", this.id, this)

            Vue.router.push({
                name: 'datacenters.singleton',
                params: {
                    id: this.abbreviation
                }
            })
        }
    }
}
