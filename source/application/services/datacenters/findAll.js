import Vue from 'vue'
import transformer from './../../transformers/datacenter'
import store from './../../store'

// When the request succeeds
const success = (datacenters) => {
    datacenters = transformer.fetchCollection(datacenters)
    store.dispatch('getDatacenters', datacenters)
}

// When the request fails
const failed = (error) => {
    console.error('Failed to retrieve datacenters: ', error)
}

export default () => {
    Vue.$http.get('/datacenters/')
        .then((response) => {
            console.log('Datacenters Response: ', response)

            if (response) {
                success(response.data)
            } else {
                failed(response)
            }
        })
        .catch((error) => {
            failed(error)
        })
}
