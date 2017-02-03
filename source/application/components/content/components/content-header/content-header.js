export default {
    props: {
        title: {
            type: String,
            default: 'Worldview'
        },
        menu: {
            default: () => [
                {
                    name: 'Global',
                    view: '#'
                },
                {
                    name: 'North America',
                    view: '#'
                },
                {
                    name: 'South America',
                    view: '#'
                },
                {
                    name: 'Europe',
                    view: '#'
                },
                {
                    name: 'Asia',
                    view: '#'
                }
            ]
        }
    }
}
