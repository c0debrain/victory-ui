import authenticationService from 'services/authentication'

export default {
    data: () => {
        return {
            user: {
                name: 'Administrator',
                avatar: 'http://themesanytime.com/startui/demo/img/photo-64-4.jpg'
            }
        }
    },

    methods: {
        logout() {
            authenticationService.logout()
        }
    }
}
