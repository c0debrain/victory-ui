import Vue from 'vue'
import transformer from './../../transformers/cluster'
import store from './../../store'

// When the request succeeds
const success = (id, collection) => {
    store.dispatch('setClusters', transformer.fetchCollection(collection))
    store.dispatch('setDatacenterClusters', {
        id, collection: transformer.fetchCollection(collection)
    })
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve clusters of datacenters: ', error)
    return error
}

// Execute the request
export default id => Vue.$http.get(`/datacenters/${id}/clusters`)
    .then(response => success(id, response.data))
    .catch(error => failed(error))
