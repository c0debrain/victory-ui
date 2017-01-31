import Vue from 'vue'
import transformer from './../../transformers/client'
import store from './../../store'

// When the request succeeds
const success = (singleton) => {
    store.dispatch('setClient', transformer.fetch(singleton))
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve client: ', error)
    return error
}

// Execute the request
export default id => Vue.$http.get(`/clients/${id}`)
    .then(response => success(response.data))
    .catch(error => failed(error))
