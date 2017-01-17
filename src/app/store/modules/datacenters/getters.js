/* ============
 * Vuex Getters
 * ============
 *
 * All the getters that can be used
 * inside the store
 */

export default {
    find(id) {
        return this.$store.state.all.filter(
            datacenter => datacenter.id === id
        )
    }
}
