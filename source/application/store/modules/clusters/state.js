export default {
    all: JSON.parse(localStorage.getItem('vuex')).clusters.all || {}
}
