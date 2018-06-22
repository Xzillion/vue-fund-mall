<template>
    <div id="investDetail">
        <title-bar title="详情" :isColorful="true"></title-bar>
        <div class="content">
            <div class="header" @click="goPage('/fundDetails')" v-touch>
                <p class="fund-name">
                    {{name}}
                </p>
                <p class="fund-code">
                    {{productCode}}
                </p>
            </div>
            <div class="content-list">
                <div class="product">
                    <div class="item-left">定投周期:</div>
                    <div class="item-right">{{investCycle}}</div>
                </div>
                <div class="product">
                    <div class="item-left">定投日期:</div>
                    <div class="item-right">{{investDate}}</div>
                </div>
                <div class="product">
                    <div class="item-left">下次扣款日期:</div>
                    <div class="item-right">{{nextDate | formatDate}}</div>
                </div>
                <div class="product">
                    <div class="item-left">定投金额:</div>
                    <div class="item-right">{{investMoney}}元</div>
                </div>
                <div class="product">
                    <div class="item-left">支付方式:</div>
                    <div class="item-right">{{payWay | formatCardNum('last4')}}({{bankName}})</div>
                </div>
                <div class="product">
                    <div class="item-left">累计定投金额:</div>
                    <div class="item-right item">{{totleInvestMoney}}元</div>
                </div>
                <div class="product">
                    <div class="item-left">累计份额:</div>
                    <div class="item-right item">{{totleShare}}份</div>
                </div>
            </div>
        </div>
        <div class="buttom-box" v-if="isModify">
            <div class="item" @click="goPage('/investModify')" v-touch><i class="iconfont icon-revise"></i> 修改</div>
            <div class="item" @click="stop" v-touch><i class="iconfont icon-stop"></i> 终止</div>
        </div>
        <div class="buttom-box" v-if="!isModify">
            <div class="not-modify">{{state}}</div>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    export default {
        name: "investDetail",
        data() {
            return {
                isModify: true, //是否可以修改和终止
                name: '测试基金', //基金名称
                productCode: '500056', //产品代码
                state: '终止审核中', //状态
                bankName: '招商',
                totleShare: '200', //累计份额
                payWay: '600032323232347806', //支付方式
                totleInvestMoney: '10000', //累计定投金额
                investMoney: '100', //金额
                nextDate: '20170628', //下次扣款时间
                investDate: '周一', //定投日期
                investCycle: '周' //定投周期
            }
        },
        methods: {
            showPasswordPan() {
                utils.showPasswordView({
                    callbackFn: (data)=> {
                        if(data.status == 2) {
                            //终止审核
                            this.isModify = false;
                        }
                    }
                });
            },
            stop() {
                utils.confirm({
                    confirmText: '终止后将不再扣款，且定投计划不可恢复',                    
                    onRightFn: () => {
                        this.showPasswordPan();
                    }
                });
            },
            goPage(url) {
                if (url == '/fundDetails') {
                    APP.openWin(url);
                    return;
                }
                utils.confirm({
                    confirmText: '确定修改定投计划?',                    
                    onRightFn: () => {
                        APP.openWin(url, {title: '定投修改'});
                    }
                });
            }
        }
    }
</script>
<style lang="less">
    @import url("../../common/style/common.less");
    #investDetail {
        .page-style();
        .content {
            flex: 1;
            background: #fff;
            margin: 13px 12px;
            border-radius: 6px;
            .header {
                text-align: center;
                padding: 16px 0px;
                margin-bottom: 10px;
                .border-b-1px();
                .fund-name {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 20px;
                    color: @dark-color;
                    margin-bottom: 4px;
                    .arrow-r(8px);
                }
                .fund-code {
                    font-size: 12px;
                    color: @gray-color;
                    letter-spacing: 0;
                    line-height: 12px;
                }
                .fund-state {
                    font-size: 14px;
                    color: #f58700;
                    letter-spacing: 0;
                    line-height: 20px;
                }
            }
            .product {
                display: flex;
                align-items: center;
                background: #fff;
                padding: 12px 18px;
                .item-left {
                    width: 120px;
                    font-size: 14px;
                    color: @gray-color;
                    text-align: left;
                }
                .item-right {
                    flex: 1;
                    font-size: 14px;
                    color: @dark-color;
                    text-align: right;
                    &.item{
                        color: @gray-color;
                    }
                }
            }
        }
        .buttom-box {
            display: flex;
            height: 50px;
            background: #fff;
            text-align: center;
            color: #b8b8b8;
            font-size: 16px;
            line-height: 50px;
            .item {
                .border-r-1px();
                flex: 1;
                width: 100%;
                color: @primary-color;
                .iconfont {
                    margin-right: 3px;
                }
            }
            .not-modify {
                width: 100%;
            }
        }
    }
</style>