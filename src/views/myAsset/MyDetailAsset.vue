<template>
    <div id="myDetailAsset">
        <title-bar :title="title" :isColorful="true"></title-bar>
        <div class="main-column-box">
            <div class="header">
                <div class="num-box">
                    <span class="item">
                            <p class="text">持有份额(份)</p>
                            <p class="num" v-fixed2small="{val: holdShare}"></p>                        
                        </span>
                    <span class="item">
                            <p class="text">持有收益率</p>
                            <p class="num" v-rateofpercent="{val: rate}"></p>                        
                        </span>
                    <span class="item">
                            <p class="text">持有时长(天)</p>
                            <p class="num">76</p>                        
                        </span>
                </div>
            </div>
            <div class="detail-box">
                <div class="tab-bar">
                    <span class="item" :class="{active: isShowMovement}" @click="isShowMovement=true">净值走势</span>
                    <span class="item" :class="{active: !isShowMovement}" @click="isShowMovement=false">收益明细</span>
                </div>
                <div class="movement-pan" v-show="isShowMovement" ref="movementPan"></div>
                <div class="returns-pan" v-show="!isShowMovement">
                    <div class="title-line">
                        <span class="title-item">日期</span>
                        <span class="title-item">当日收益</span>
                    </div>
                    <div class="content-pan" v-for="(item, index) in earningsList" :key="index">
                        <span class="item">{{item.date}}</span>
                        <span class="item" v-updownwithcolor="{val: item.money}"></span>
                    </div>
                    <div class="more" @click="assetDetails()">查看更多</div>
                </div>
            </div>
            <line-cell title="分红方式" :text="profitWay" url="/dividendWay"></line-cell>
            <!-- <div class="profit-box" v-touch>
                <span class="text">分红方式</span>
                <span class="choose" @click="chooseDividendWay">分红再投资</span>
            </div> -->
        </div>
        <div class="buttom-box">
            <div class="item" @click="goPage('/fundRedemption')"><i class="iconfont icon-shuhui"></i>赎回</div>
            <div class="item" @click="goPage('/investModify')"><i class="iconfont icon-dingtou"></i>定投</div>
            <div class="item" @click="goPage('/fundBuy')"><i class="iconfont icon-goumai"></i>购买</div>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    // var echarts = require('echarts');
    var echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/legend');
    export default {
        name: 'myDetailAsset',
        data() {
            return {
                title: '',
                profitWay: '分红再投资', //分红方式
                holdShare: 1000,
                rate: 0.01334,
                isShowMovement: true,
                earningsList: [{
                        date: '2017-01-02',
                        money: '5.05'
                    },
                    {
                        date: '2017-01-02',
                        money: '5.05'
                    },
                    {
                        date: '2017-01-02',
                        money: '-5.05'
                    },
                    {
                        date: '2017-01-02',
                        money: '-1.05'
                    },
                    {
                        date: '2017-01-02',
                        money: '23.05'
                    }
                ]
            }
        },
        methods: {
            goPage(url) {
                APP.openWin(url);
            },
            assetDetails() {
                APP.openWin('/inComeDetails');
            },
            drawChart() {                
                this.$nextTick(() => {
                    var myChart = echarts.init(this.$refs.movementPan);
                    var option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            icon: 'rect',
                            top: 10,
                            itemWidth: 8,
                            itemHeight: 2,
                            data: ['本基金', '同类均值', '沪深300']
                        },
                        xAxis: {
                            type: 'category',
                            name: '',
                            splitLine: {
                                show: false
                            },
                            data: ['2017-6', '2017-7', '2017-8', '2017-9', '2017-10', '2017-11', '2017-12', '2018-1', '2018-2']
                        },
                        yAxis: {
                            axisLabel: {
                                formatter: function(val) {
                                    return val + '%';
                                }
                            }
                        },
                        series: [{
                                name: '本基金',
                                type: 'line',
                                data: [0.1, 1.3, 1.4, 1.3, 1.8, 2, 1.1, 1.2, 2.22]
                            },
                            {
                                name: '同类均值',
                                type: 'line',
                                data: [0.1, 1.1, 1.2, 1.4, 0.8, 1.6, 1.32, 1.64, 1.12]
                            },
                            {
                                name: '沪深300',
                                type: 'line',
                                data: [0.1, 1, 1.4, 1.8, 1.16, 1.2, 1.64, 1.128, 1.26]
                            }
                        ]
                    };
                    myChart.setOption(option);
                });                
            }
        },
        mounted() {
            var data = utils.getData('detailAssetItem') || {};
            // this.holdShare = data.holdShare;
            this.title = data.fundName || '详情页';

            setTimeout(() => {
                this.drawChart();
            }, 200);            
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #myDetailAsset {
        .page-style();
        .main-column-box {
            padding-bottom: 12px;
        }
        .header {
            background-color: #fff;
            .num-box {
                display: flex;
                padding: 24px 0;
                .border-b-1px();
                .item {
                    flex: 1;
                    width: 100%;
                    text-align: center;
                    .border-r-1px();
                    .num {
                        font-size: 24px;
                        color: @dark-color;
                    }
                    .text {
                        margin-bottom: 4px;
                        font-size: 13px;
                        color: #ababab;
                    }
                }
            }
        }
        .detail-box {
            margin: 10px 0;
            background-color: #fff;
            .tab-bar {
                display: flex;
                .border-b-1px(); // border-bottom: 1px solid @border-color;
                .item {
                    flex: 1;
                    width: 0;
                    text-align: center;
                    padding: 12px 0;
                    font-size: 16px;
                    color: @dark-color;
                    margin: 0 40px;
                    &.active {
                        color: @primary-color;
                        border-bottom: 2px solid @primary-color;
                    }
                }
            }
            .movement-pan {
                width: 100%;
                padding: 10px;
                height: 281px;
            }
            .returns-pan {
                width: 100%;
                .title-line {
                    display: flex;
                    padding: 10px 0;
                    background-color: #f8f8f8;
                    .title-item {
                        flex: 1;
                        width: 100%;
                        text-align: center;
                        font-size: 13px;
                        color: @litdark-color;
                    }
                }
                .content-pan {
                    display: flex;
                    padding: 10px 0;
                    .border-b-1px();
                    .item {
                        flex: 1;
                        width: 100%;
                        font-size: 16px;
                        color: @litdark-color;
                        text-align: center;
                    }
                }
                .more {
                    padding: 10px 0;
                    text-align: center;
                    color: @primary-color;
                }
            }
        }
        .profit-box {
            display: flex;
            padding: 15px;
            background-color: #fff;
            .text {
                font-size: 16px;
                color: @dark-color;
            }
            .choose {
                flex: 1;
                text-align: right;
                font-size: 14px;
                color: @gray-color;
                .arrow-r();
            }
        }
        .buttom-box {
            display: flex;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: #fff;
            box-shadow: @btn-shadow;
            .border-t-1px();
            .item {
                flex: 1;
                font-size: 16px;
                width: 100%;
                height: 100%;
                color: @primary-color;
                .border-r-1px();
                .iconfont {
                    margin-right: 4px;
                    font-size: 14px;
                }
            }
        }
    }
</style>