import Vue from 'vue'
import transformer from './../../transformers/datacenter'
import store from './../../store'

// When the request succeeds
const success = (singleton) => {
    store.dispatch('setDatacenter', transformer.fetch(singleton))
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve datacenter: ', error)
    return error
}

// Execute the request
export default id => Vue.$http.get(`/datacenters/${id}`)
    .then(response => success(response.data))
    .catch(error => failed(error))