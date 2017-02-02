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
    }
}
