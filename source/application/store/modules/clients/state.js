export default {
    all: JSON.parse(localStorage.getItem('vuex')).clients.all || {}
}
