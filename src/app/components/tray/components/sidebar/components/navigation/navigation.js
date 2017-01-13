export default {
    data: () => {
        return {
            menu: [
                {
                    name: 'home.index',
                    title: 'Overview'
                },
                {
                    name: 'datacenters.index',
                    title: 'Datacenters',
                    badge: {
                        type: 'complete',
                        content: '21'
                    }
                }
            ]
        }
    }
}
