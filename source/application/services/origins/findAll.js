import Vue from 'vue'
import transformer from './../../transformers/origin'
import store from './../../store'

// When the request succeeds
const success = (collection) => {
    store.dispatch('setOrigins', transformer.fetchCollection(collection))
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve origins: ', error)
    return error
}

// Execute the request
export default () => Vue.$http.get('/origins/')
    .then(response => success(response.data))
    .catch(error => failed(error))
