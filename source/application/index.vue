<template>
    <div class="application">
        <router-view></router-view>
    </div>
</template>

<style media="screen">
    .application {
        height: 100%;
        width: 100%;
        display: flex;
    }
</style>

<script>
    /* ============
     * Entry Point
     * ============
     *
     * The entry point of the application
     */

    import store from './store'
    import { router } from './../bootstrap'
    // import datacenterService from './services/datacenters'

    export default {
        /**
         * The Vuex store
         */
        store,

        /**
         * The router
         */
        router,

        /**
         * Fires when the app has been mounted
         */
        mounted() {
            // If the user is authenticated,
            // fetch the data from the API
            if (this.$store.state.authentication.authenticated) {
                // datacenterService.findAll()
            }

            /* eslint-disable */
            (function() {
                var cleanUp
                var debounce
                var i
                var len
                var ripple
                var rippleContainer
                var ripples
                var showRipple

                debounce = (func, delay) => {
                    var inDebounce
                    inDebounce = undefined
                    return () => {
                        var args, context
                        context = this
                        args = arguments
                        clearTimeout(inDebounce)
                        return inDebounce = setTimeout(() => {
                            return func.apply(context, args)
                        }, delay)
                    }
                }

                showRipple = (e) => {
                    var pos, ripple, rippler, size, style, x, y
                    ripple = this
                    rippler = document.createElement('span')
                    size = ripple.offsetWidth
                    pos = ripple.getBoundingClientRect()
                    x = e.pageX - pos.left - (size / 2)
                    y = e.pageY - pos.top - (size / 2)
                    style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;'
                    ripple.rippleContainer.appendChild(rippler)
                    return rippler.setAttribute('style', style)
                }

                cleanUp = () => {
                    while (this.rippleContainer.firstChild) {
                        this.rippleContainer.removeChild(this.rippleContainer.firstChild)
                    }
                }

                ripples = document.querySelectorAll('[ripple]')

                for (i = 0, len = ripples.length; i < len; i++) {
                    ripple = ripples[i]
                    rippleContainer = document.createElement('div')
                    rippleContainer.className = 'ripple--container'
                    ripple.addEventListener('mousedown', showRipple)
                    ripple.addEventListener('mouseup', debounce(cleanUp, 2000))
                    ripple.rippleContainer = rippleContainer
                    ripple.appendChild(rippleContainer)
                }
            }())
            /* eslint-enable */
        }
    }
</script>
