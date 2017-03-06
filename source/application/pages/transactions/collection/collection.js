import transactionService from 'services/transactions'

export default {
    data() {
        return {
            transactions: {}
        }
    },

    created() {
        transactionService.findAll().then(() => {
            this.transactions = this.$store.state.transactions.all
        })
    }
}
