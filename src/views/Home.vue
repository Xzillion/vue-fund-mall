<template>
    <div id="home">
        <router-view></router-view>
        <buttom-bar :list="list"></buttom-bar>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data() {
            return {}
        },
        created() {
            this.list = [{
                    name: '首页',
                    key: 'home',                    
                    url: '/home',
                    icon: 'icon-home'
                },
                {
                    name: '资产',
                    key: 'asset',                    
                    url: '/home/asset',
                    icon: 'icon-zhichan'
                },
                {
                    name: '我的',
                    key: 'mine',                    
                    url: '/home/mine',
                    icon: 'icon-me'
                }
            ]
        },
        methods: {}
    }
</script>
<style lang="less">
    @import "../common/style/common.less";
    #home {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>