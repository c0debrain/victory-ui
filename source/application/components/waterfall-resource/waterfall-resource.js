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
        identifier: {
            type: Number
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
