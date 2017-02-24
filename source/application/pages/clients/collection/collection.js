import store from 'store'
import clientService from 'services/clients'
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
        clients() { return this.$store.getters.getClientsArray() }
    },

    mounted() {
        clientService.findAll()
    },

    methods: {
        onInfinite() {
            setTimeout(() => {
                let pullCount = 100

                if (this.clients.length > 0 && (this.list.length + pullCount) > this.clients.length) {
                    pullCount = this.clients.length - this.list.length

                    if (pullCount === 0) {
                        return this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
                    }
                }

                const temp = []

                for (let i = this.list.length; i <= this.list.length + (pullCount - 1); i++) {
                    if (i < this.clients.length) temp.push(this.clients[i])
                }

                this.list = this.list.concat(temp)
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
            }, 100)
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'clients:health')
        delete this.$options.sockets['clients:health']
    },

    sockets: {
        'clients:health': function(response) {
            // console.log('datacenters:health event receieved: ', response)
            store.dispatch('setClientsHealth', response.data)
        }
    }
}
