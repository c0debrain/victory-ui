import transactionService from 'services/transactions'

export default {
    data() {
        return {
            transactions: [],
            sorted: 'date'
        }
    },

    methods: {
        sort(field) {
            if (this.transactions.length === 0) return console.log('No Transactions')
            if (!this.transactions[0].hasOwnProperty(field)) return console.log('Objects do not contain said property')
            if (this.sorted === field) return this.transactions.reverse()

            if (typeof this.transactions[0][field] === 'number')
                this.transactions = this.transactions.sort((previous, current) => previous[field] - current[field])

            if (typeof this.transactions[0][field] === 'string')
                this.transactions = this.transactions.sort((previous, current) => previous[field].localeCompare(current[field]))

            this.sorted = field
        }
    },

    created() {
        transactionService.findAll().then(() => {
            this.transactions = this.$store.getters.getTransactionsArray()
        })
    }
}
