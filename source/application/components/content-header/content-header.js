export default {
    props: {
        title: {
            type: String,
            default: 'Worldview'
        },
        tabs: {
            type: Array,
            default: () => []
        }
    }
}
