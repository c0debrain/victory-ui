import { UiRippleInk } from 'keen-ui';


export default {
    components: {
        'ui-ripple': UiRippleInk
    },

    data: () => {
        return {
            menu: [{
                name: 'home.index',
                title: 'Overview'
            }, {
                name: 'datacenters.collection',
                title: 'Datacenters'
            }, {
                name: 'clients.collection',
                title: 'Clients'
            }, {
                name: 'origins.collection',
                title: 'Origins'
            }]
        }
    }
}
