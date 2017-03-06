<template>
    <div class="content transactions">
        <content-header :tabs="tabs" :title="'Transactions'"></content-header>

        <div class="content-body">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>


<script lang="babel">

    export default {
        components: {
            'content-header': require('components/content-header/content-header.vue')
        }
    }
</script>


<style src="./transactions.less" lang="less"></style>
