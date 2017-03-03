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

    computed: {
        text() {
            if (typeof this.health !== 'undefined' && this.health !== false && !isNaN(this.health)) {
                return this.health.toFixed(1) + '%'
            }

            return 'None'
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
