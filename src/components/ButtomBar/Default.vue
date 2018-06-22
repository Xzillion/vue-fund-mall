<template>
    <div class="hs-buttomBar-default">
        <div class="item" v-for="item in list" :key="item.key" :class="{active: item.key === activeKey}" @click="select(item)">
            <i class="iconfont" :class="item.icon"></i>
            <p class="text">{{item.name}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'hs-buttomBar',
        data() {
            return {}
        },
        created() {
        },
        props: {
            /* 
            {
                name: '首页', --展示名称
                key: 'home',  --唯一标示                  
                url: '/home', --路由地址
                icon: 'icon-home' --图标
            } 
            */
            list: {
                required: true,
                type: Array               
            }
        },
        computed: {
            activeKey() {
                return this.$store.state.buttomBarActiveKey;
            }
        },
        methods: {
            select(item) {                
                if (item.key === this.activeKey) {
                    return;
                }
                this.$store.commit('buttomBarActiveKey', item.key);
                this.$router.push(item.url);
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    .hs-buttomBar-default {
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 0.5rem;
        background-color: #fff;
        border-top: 1px solid #ebebeb;
        z-index: 99;
        .item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            width: 100%;
            text-align: center;
            color: #999;
            &.active {
                color: @primary-color;
            }
            .iconfont {
                font-size: 0.2rem;
            }
            .text {
                font-size: 12px;
            }
        }
    }
</style>