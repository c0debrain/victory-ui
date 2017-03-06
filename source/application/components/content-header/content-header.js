export default {
    props: {
        title: {
            type: String
        },
        tabs: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        isTabbed() { return this.tabs.find(tab => tab.view === this.$route.name) }
    }
}
