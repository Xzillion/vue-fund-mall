<template>
    <div id="watchAgreement">
        <title-bar :title="title"></title-bar>
        <div class="main-column-box" v-html="content"></div>
    </div>
</template>
<script>
    export default {
        name: "watchAgreement",
        data() {
            return {
                title: '协议',
                content: '协议内容'
            }
        },
        mounted() {
            this.title = this.$route.query.title || '协议';
        },
        methods: {
        }
    }
</script>
<style lang="less">
    @import url("../../common/style/common.less");
    #watchAgreement {
        .page-style();
        .main-column-box {
            padding: 16px;
            background-color: #fff;
        }
    }
</style>
