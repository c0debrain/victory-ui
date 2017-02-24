import Vue from 'vue'

export default {
    props: {
        identifier: {
            required: true
        },
        name: {
            type: String,
            required: true,
            default: ''
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
            if (!this.resource || !this.identifier) return

            Vue.router.push({
                name: `${this.resource}.singleton`,
                params: {
                    id: this.identifier
                }
            })
        }
    }
}
