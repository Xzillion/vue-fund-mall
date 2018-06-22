<template>
    <div id="mine">
        <div class="name-pan" @click="goPage('/myInformation')">
            <!-- <div class="img">
                    <i class="iconfont icon-me"></i>
                </div> -->
            <div class="img-box">
                <img :src="imgIcon" class="img-icon">
            </div>
            <div class="des-pan">
                <p class="name">张三</p>
                <p class="num">理财账号:123456</p>
            </div>
            <span class="iconfont icon-arrow"></span>
        </div>
        <div class="group">
            <line-cell title="交易记录" url="/transactionRecord">
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jyjl"></use>
                    </svg>
            </line-cell>
        </div>
        <div class="group">
            <line-cell title="银行卡管理" url="/bankCardManage">
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-card"></use>
                    </svg>
            </line-cell>
            <line-cell title="密码管理" url="/changeTradePwd">
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mmgl"></use>
                    </svg>
            </line-cell>
            <line-cell title="风险测评" url="/evaluationResult">
                <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fxts"></use>
                    </svg>
            </line-cell>
        </div>
        <p class="version">-版本 1.0.0-</p>
    </div>
</template>
<script>
    import myImg from 'src/assets/appear.png'
    import utils from 'js/utils'
    export default {
        name: 'mine',
        data() {
            return {
                imgIcon: myImg
            }
        },
        created() {
            this.$store.commit('buttomBarActiveKey', 'mine');
        },
        methods: {
            goPage(url) {
                APP.openWin(url);
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #mine {
        .overflow-auto();
        padding-bottom: 0.6rem;
        .name-pan {
            background-image: @colorful-color;
            padding: 0.5rem 0.12rem 0.4rem 0.3rem;
            display: flex;
            align-items: center;
            color: #fff;
            .img-box {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 100%;
                border: 1px solid #fff;
                width: 0.76rem;
                height: 0.76rem;
                margin-right: 0.14rem;
                opacity: 0.9;
            }
            .img-icon {
                border-radius: 100%;
                width: 0.7rem;
                height: 0.7rem;
            }
            .icon-arrow {
                font-size: 14px;
            }
            .des-pan {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                color: #fff;
                .name {
                    font-size: 0.18rem;
                    margin-bottom: 0.06rem;
                }
                .num {
                    font-size: 0.14rem;
                    opacity: 0.8;
                }
            }
        }
        .group {
            margin: 10px 0;
            background: #fff;
        }
        .version {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #999999;
            text-align: center;
        }
    }
</style>