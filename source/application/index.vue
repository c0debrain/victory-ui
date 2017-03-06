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
         * Filters
         */
        filters: {
            currency(value) { return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') }
        }
    }
</script>
