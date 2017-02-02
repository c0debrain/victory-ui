import Vue from 'vue'
import store from './../../store'

// When the request succeeds
const success = (token) => {
    store.dispatch('login', token)
    Vue.router.push({ name: 'home.index' })
}

// When the request fails
const failed = (error) => {
    console.log('Authentication failed: ', error)
}

export default user => Vue.$http.post('/authenticate', user)
    .then(response => success(response.data))
    .catch(error => failed(error))
