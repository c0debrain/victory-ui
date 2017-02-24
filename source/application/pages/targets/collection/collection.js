import store from 'store'
import targetService from 'services/targets'
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
        targets() { return this.$store.getters.getTargetsArray() }
    },

    mounted() {
        targetService.findAll({ offset: 0, limit: 100 })
            .then(() => {
                this.list = this.list.concat(this.targets)
            })
    },

    methods: {
        onInfinite() {
            targetService.findAll({ offset: this.list.length, limit: 100 })
                .then(() => {
                    const temp = []

                    for (let i = this.list.length; i <= this.list.length + 99; i++) {
                        if (i < this.targets.length) temp.push(this.targets[i])
                    }

                    this.list = this.list.concat(temp)
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
                })
                .catch(error => {
                    console.log('Couldn\'t retrieve any more targets.', error)
                    return this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
                })
        }
    },

    // destroyed() {
    //     console.log('Killing socket listener for: ', 'targets:health')
    //     delete this.$options.sockets['targets:health']
    // },

    // sockets: {
    //     'targets:health': function(response) {
    //         store.dispatch('setTargetsHealth', response.data)
    //     }
    // }
}
