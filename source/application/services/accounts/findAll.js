import Vue from 'vue'
import store from './../../store'

// When the request succeeds
const success = (collection) => {
    store.dispatch('setAccounts', collection)
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve accounts: ', error)
    return error
}

// Execute the request
export default () => Vue.$http.get('/accounts')
    .then(response => success(response.data))
    .catch(error => failed(error))
