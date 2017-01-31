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
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },

    methods: {
        enterResource: function(resource) {
            Vue.router.push({
                name: `${this.type}.singleton`,
                params: {
                    id: this.abbreviation
                }
            })
        }
    }
}
