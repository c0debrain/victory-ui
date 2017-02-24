import store from 'store'
import originService from 'services/origins'
import InfiniteLoading from 'vue-infinite-loading'

export default {
    components: {
        'resource': require('components/resource/resource.vue'),
        'infinite-loading': InfiniteLoading
    },

    data() {
        return {
            list: []
        }
    },

    computed: {
        origins() { return this.$store.getters.getOriginsArray() }
    },

    mounted() {
        originService.findAll()
    },

    methods: {
        onInfinite() {
            setTimeout(() => {
                let pullCount = 100

                if (this.origins.length > 0 && (this.list.length + pullCount) > this.origins.length) {
                    pullCount = this.origins.length - this.list.length

                    if (pullCount === 0) {
                        return this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
                    }
                }

                const temp = []

                for (let i = this.list.length; i <= this.list.length + (pullCount - 1); i++) {
                    if (i < this.origins.length) temp.push(this.origins[i])
                }

                this.list = this.list.concat(temp)
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            }, 100)
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'origins:health')
        delete this.$options.sockets['origins:health']
    },

    sockets: {
        'origins:health': function(response) {
            store.dispatch('setOriginsHealth', response.data)
        }
    }
}
