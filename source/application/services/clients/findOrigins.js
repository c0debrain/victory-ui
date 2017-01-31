import Vue from 'vue'
import transformer from './../../transformers/origin'
import store from './../../store'

// When the request succeeds
const success = (id, collection) => {
    store.dispatch('setOrigins', transformer.fetchCollection(collection))
    store.dispatch('setClientOrigins', {
        id, collection: transformer.fetchCollection(collection)
    })
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve origins of client: ', error)
    return error
}

// Execute the request
export default id => Vue.$http.get(`/clients/${id}/origins`)
    .then(response => success(id, response.data))
    .catch(error => failed(error))
