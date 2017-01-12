import Vue from 'vue'
import transformer from './../../transformers/datacenter'
import store from './../../store'

// When the request succeeds
const success = (datacenter) => {
    datacenter = transformer.fetch(datacenter)
    store.dispatch('getDatacenter', datacenter)
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve datacenter: ', error)
}

export default (id) => {
    Vue.$http.get(`/datacenters/${id}`)
        .then((response) => {
            console.log('Datacenter Response: ', response)

            if (response) {
                success(response)
            } else {
                failed(response)
            }
        })
        .catch((error) => {
            failed(error)
        })
}
