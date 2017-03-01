import chartConstructor from 'utilities/chartConstructor'
import originService from 'services/origins'
import store from 'store'

export default {
    components: {
        'resource': require('components/resource/resource.vue')
    },

    data() {
        return {
            targets: [],
            dispatches: [],
            health_history: [],
            opened: null
        }
    },

    computed: {
        origin() { return this.$store.state.origins.all[this.$route.params.id] },


        // Chart configuration
        options() {
            return chartConstructor({
                series: [{
                    name: 'Health',
                    data: this.health_history
                }, {
                    type: 'flags',
                    name: 'Flags on series',
                    data: this.dispatches.map(dispatch => {
                        if (dispatch.approved_at !== null) return {
                            x: moment.utc(dispatch.created_at).valueOf(),
                            title: dispatch.approved_reason.includes('attention') ? 'Attention!' : 'Re-page',
                            text: dispatch.approved_reason,
                            color: dispatch.approved_reason.includes('attention') ? '#FD6666' : '#FFDF6D',
                        }

                        if (dispatch.rejected_at !== null) return {
                            x: moment.utc(dispatch.created_at).valueOf(),
                            title: 'Paged!',
                            text: dispatch.created_reason
                        }

                        return {
                            x: moment.utc(dispatch.created_at).valueOf(),
                            title: 'Dispatched!',
                            text: dispatch.created_reason
                        }
                    }),
                    onSeries: 'dataseries',
                    shape: 'squarepin'
                }]
            })
        }
    },

    created: function() {
        this.load(this.$route.params.id)
    },

    methods: {
        load(id) {
            // Autofill datacenter from store IF exists
            if (store.state.origins.all[id]) {
                this.origin = store.state.origins.all[id]

                // Autofill clusters from store IF exists
                if (store.state.origins.all[id].targets && store.state.origins.all[id].targets.length > 0) {
                    this.targets = store.getters.getTargets(store.state.origins.all[id].targets)
                }
            }

            // Retrieve origin from API
            originService.find(id).then(() => {
                this.origin = store.state.origins.all[id]

                // Retrieve targets from API
                originService.findTargets(id).then(() => {
                    this.targets = store.getters.getTargets(this.origin.targets)
                })

                // Retrieve health history from API
                originService.findHealthHistory(id)
                    .then((history) => {
                        this.health_history = history
                            .map(health => [
                                moment.utc(health.created_at).valueOf(),
                                health.score
                            ])
                            .sort((previous, current) => current[0] > previous[0] ? -1 : 1)
                    })

                // Retrieve health history from API
                originService.findDispatchHistory(id).then((history) => {
                    this.dispatches = history.reverse().map((dispatch) => {
                        if (dispatch.approved_at !== null) {
                            // If dispatch is not a repeated alarm
                            if (dispatch.approved_reason.includes('attention')) {
                                dispatch.repeat = false
                                dispatch.icon = 'fa-warning'
                                dispatch.color = '#FFA2AD'
                                return dispatch
                            }

                            // If it is repeated
                            dispatch.repeat = true
                            dispatch.icon = 'fa-bell-o'
                            dispatch.color = '#FDC006'
                            return dispatch
                        }

                        if (dispatch.rejected_at !== null) {
                            dispatch.icon = 'fa-bell-slash-o'
                            dispatch.color = '#74C7A8'
                            return dispatch
                        }

                        dispatch.icon = 'fa-clock-o'
                        dispatch.color = '#000'

                        return dispatch
                    })
                })
            })
        },

        openDispatch(dispatch, index) {
            this.opened = { index, dispatch }
        },

        closeDispatch() {
            this.opened = null
        }
    },

    destroyed() {
        // Kill socket listeners
        delete this.$options.sockets['origins:health']
        delete this.$options.sockets['targets:health']
    },

    sockets: {
        /**
         * Listen for new health for origin resources
         * @type {object} response
         */
        'origins:health': function(response) {
            if (this.origin) {
                const singletonHealth = response.data.find(health => health.id === this.$route.params.id) || false

                // If this resource's health was found in the emitted values,
                // then updated store with the new data
                if (singletonHealth) {
                    store.dispatch('setOriginHealth', {
                        id: this.$route.params.id,
                        health: singletonHealth.score
                    })
                }
            }
        },

        /**
         * Listen for new health for target resources
         * @type {object} response
         */
        'targets:health': function(response) {
            if (this.origin && this.targets.length > 0 && response.data.length > 0) {
                store.dispatch('setTargetsHealth', response.data.filter(
                    health => this.origin.targets.includes(health.id)
                ))
            }
        }
    }
}
