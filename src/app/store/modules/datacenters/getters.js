/* ============
 * Vuex Getters
 * ============
 *
 * All the getters that can be used
 * inside the store
 */
import Vue from 'vue'

export default {
    computed: {
        get(id) {
            Vue.filter('my-filter', function () {
                return this.$store.state.all[id]
            })
        }
    }
}
