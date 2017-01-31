import Vue from 'vue'

// When the request succeeds
const success = (id, collection) => collection

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve targets of origin: ', error)
    return error
}

// Execute the request
export default id => Vue.$http.get(`/origins/${id}/health`)
    .then(response => success(id, response.data))
    .catch(error => failed(error))
