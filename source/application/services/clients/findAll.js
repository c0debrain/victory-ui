import Vue from 'vue'
import transformer from './../../transformers/client'
import store from './../../store'

// When the request succeeds
const success = (collection) => {
    store.dispatch('setClients', transformer.fetchCollection(collection))
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve clients: ', error)
    return error
}

// Execute the request
export default () => Vue.$http.get('/clients/')
    .then(response => success(response.data))
    .catch(error => failed(error))
