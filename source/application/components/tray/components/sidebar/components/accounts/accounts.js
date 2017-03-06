import accountService from 'services/accounts'

export default {
    data() {
        return {
            accounts: {}
        }
    },

    created() {
        accountService.findAll().then(() => {
            this.accounts = this.$store.state.accounts.all
        })
    }
}
