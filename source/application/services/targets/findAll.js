import Vue from 'vue'
import transformer from './../../transformers/target'
import store from './../../store'

// When the request succeeds
const success = (collection) => {
    store.dispatch('setTargets', transformer.fetchCollection(collection))
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve origins: ', error)
    return error
}

// Execute the request
export default (parameters = {}) => Vue.$http.get('/targets/', { params: parameters })
    .then(response => success(response.data))
    .catch(error => failed(error))
