<template>
    <div class="content clients">
        <content-header></content-header>

        <div class="content-body">
            <div class="page collection">
                <table class="table table-striped">
                    <thead>
                        <th></th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </thead>
                    <tbody>
                        <tr v-for="transaction in transactions">
                            <td><input type="checkbox" name="" value=""></td>
                            <td>{{ transaction.date }}</td>
                            <td>{{ transaction.name }}</td>
                            <td>{{ transaction.category_id || 'Uncategorized' }}</td>
                            <td>{{ transaction.amount }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script lang="babel">
    import transactionService from 'services/transactions'

    export default {
        components: {
            'content-header': require('components/content-header/content-header.vue')
        },

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
</script>


<style src="./transactions.less" lang="less"></style>
