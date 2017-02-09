export default {
    all: localStorage.getItem('vuex') ? (JSON.parse(localStorage.getItem('vuex')).datacenters.all || {}) : {}
}
