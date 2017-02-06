export default {
    all: JSON.parse(localStorage.getItem('vuex')).datacenters.all || {}
}
