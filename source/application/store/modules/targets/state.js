export default {
    all: localStorage.getItem('vuex') && localStorage.getItem('vuex').targets ? (JSON.parse(localStorage.getItem('vuex')).targets.all || {}) : {}
}
