export default {
    props: {
        tabs: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        isTabbed() { return this.tabs.find(tab => tab.view === this.$route.name) },

        /*
         * Convert page identifier to Title Case
         * http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
         */
        title() {
            return this.$route.name
                .replace('.', ' ')
                .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        }
    }
}
