import Vue from 'vue'
import transformer from './../../transformers/target'
import store from './../../store'

// When the request succeeds
const success = (singleton) => {
    store.dispatch('setTarget', transformer.fetch(singleton))
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve origin: ', error)
    return error
}

// Execute the request
export default id => Vue.$http.get(`/targets/${id}`)
    .then(response => success(response.data))
    .catch(error => failed(error))
