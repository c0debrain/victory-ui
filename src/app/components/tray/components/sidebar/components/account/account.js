import authenticationService from 'services/authentication'

export default {
    methods: {
        logout() {
            authenticationService.logout()
        }
    }
}
