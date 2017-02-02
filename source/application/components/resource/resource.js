import Vue from 'vue'

export default {
    props: {
        abbreviation: {
            required: true
        },
        name: {
            type: String,
            required: true
        },
        health: {
            required: true
        },
        resource: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false
        }
    },

    methods: {
        enterResource: function(resource) {
            Vue.router.push({
                name: `${this.resource}.singleton`,
                params: {
                    id: this.abbreviation
                }
            })
        }
    }
}
