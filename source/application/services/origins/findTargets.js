import Vue from 'vue'
import transformer from './../../transformers/target'
import store from './../../store'

// When the request succeeds
const success = (id, collection) => {
    store.dispatch('setTargets', transformer.fetchCollection(collection))
    store.dispatch('setOriginTargets', {
        id, collection: transformer.fetchCollection(collection)
    })
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve targets of origin: ', error)
    return error
}

// Execute the request
export default id => Vue.$http.get(`/origins/${id}/targets`)
    .then(response => success(id, response.data))
    .catch(error => failed(error))
