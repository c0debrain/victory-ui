import Vue from 'vue'

export default {
    props: {
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
        },
        idlink: {
            type: Number
        }
    },

    methods: {
        enterResource: function(resource) {
            Vue.router.push({
                name: `${this.resource}.singleton`,
                params: {
                    id: this.idlink
                }
            })
        }
    }
}
