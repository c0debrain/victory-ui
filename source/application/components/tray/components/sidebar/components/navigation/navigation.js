export default {
    data: () => {
        return {
            menu: [{
                name: 'home.index',
                title: 'Overview',
                icon: 'fa-tachometer',
                subitems: []
            }, {
                name: 'datacenters',
                title: 'Datacenters',
                icon: 'fa-database',
                subitems: [{
                    name: 'datacenters.collection',
                    title: 'Collection View',
                }]
            }, {
                name: 'clients',
                title: 'Clients',
                icon: 'fa-users',
                subitems: [{
                    name: 'clients.collection',
                    title: 'Collection View',
                }]
            }, {
                name: 'origins',
                title: 'Origins',
                icon: 'fa-sitemap',
                subitems: [{
                    name: 'origins.collection',
                    title: 'Collection View',
                }, {
                    name: 'origins.waterfall',
                    title: 'Waterfall View',
                }]
            }, {
                name: 'targets',
                title: 'Targets',
                icon: 'fa-language',
                subitems: [{
                    name: 'targets.collection',
                    title: 'Collection View',
                }, {
                    name: 'targets.waterfall',
                    title: 'Waterfall View',
                }]
            }]
        }
    }
}
