export default {
    data: () => {
        return {
            menu: [{
                    name: 'home.index',
                    title: 'Overview'
                }, {
                    name: 'datacenters.collection',
                    title: 'Datacenters',
                    badge: {
                        type: 'complete',
                        content: '21'
                    }
                }, {
                    name: 'clients.collection',
                    title: 'Clients'
                }
            ]
        }
    }
}
