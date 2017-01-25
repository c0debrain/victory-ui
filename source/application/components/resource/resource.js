import Vue from 'vue'

export default {
    props: {
        abbreviation: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        health: {
            type: Number,
            required: true
        }
    },

    methods: {
        enterResource: function(resource) {
            Vue.router.push({
                name: 'datacenters.singleton',
                params: {
                    id: this.abbreviation
                }
            })
        }
    }
}
