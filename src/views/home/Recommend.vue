<template>
    <div id="recommend" @scroll="mScroll">
        <div id="search-main" class="search-main">
            <div class="search-input" @click="goPage('/selectFund')">
                <span class=" iconfont icon-search search-icon"></span>
                <span class="search-description">输入基金名称/代码进行搜索</span>
            </div>
        </div>
        <swiper :list="list" auto loop dots-position="center" style="width:100%;margin:0 auto;"></swiper>
        <div class="classify-box">
            <div class="item" v-for="(item, index) in subjectList" @click="goSubject(item)" :key="index" v-touch>
                <img :src="item.image" class="icon-subject">
                <p class="text">{{item.name}}</p>
            </div>
        </div>
        <div class="choiceness-box">
            <div class="item" v-for="(item, index) in choicenessList" :key="index">
                <div class="icon-text">精选</div>
                <p class="name text-center">{{item.name}}</p>
                <p class="rate text-center" v-percent="{val: item.rate}"></p>
                <p class="text text-center">七日年化收益率</p>
                <div class="btn-buy" @click="goChoiceness(item)" v-btntouch>购买</div>
            </div>
        </div>
        <div class="hot-box">
            <div class="top-pan">
                <div class="title">热门基金</div>
                <div class="more" @click="goPage('/hotFundRanking')">更多基金<span class="icon"></span></div>
            </div>
            <div class="content-pan">
                <div class="item" v-for="(item, index) in hotFundList" @click="goHotFund(item)" :key="index" v-touch>
                    <div class="left-pan">
                        <p class="rate" v-percent="{val: item.rate}"></p>
                        <p class="text">{{item.dateText}}</p>
                    </div>
                    <div class="right-pan">
                        <p class="name">{{item.name}}</p>
                        <div class="detail">
                            <span class="text">{{item.minText}}</span>
                            <span class="text">{{item.riskText}}</span>
                            <span class="text">{{item.typeText}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <divider>我是有底线的</divider>
    </div>
</template>
<script>
    import utils from 'js/utils'
    import {
        Swiper,
        Divider
    } from 'vux'
    import _ from 'underscore'
    const theme = require('../../../build/config.js').themeStyle
    var svgclock = require(`src/assets/${theme}/icon/clock.svg`)
    var svgtheme = require(`src/assets/${theme}/icon/theme.svg`)
    var svgpurse = require(`src/assets/${theme}/icon/purse.svg`)
    var svgmine = require(`src/assets/${theme}/icon/mine.svg`)
    // import svgclock from 'src/assets/clock.svg'
    // import svgtheme from 'src/assets/theme.svg'
    // import svgpurse from 'src/assets/purse.svg'
    // import svgmine from 'src/assets/mine.svg'
    const baseList = [{
            img: 'static/image/banner01.png'
        },
        {
            img: 'static/image/banner01.png'
        },
        {
            img: 'static/image/banner01.png'
        }
    ]
    var $searchMain = null;
    var $recommend = null;
    var colorProportion = 0;
    var opacity = 0;
    export default {
        name: 'recommend',
        created() {
            this.$store.commit('buttomBarActiveKey', 'home');
            this.$nextTick(() => {
                $searchMain = $('#search-main');
                $recommend = $('#recommend');
            });
        },
        data() {
            return {
                list: baseList,
                subjectList: [{
                        name: '定投专区',
                        url: '/fixedInvestmentFunds',
                        image: svgclock
                    },
                    {
                        name: '主题选基',
                        url: '/themeFund',
                        image: svgtheme
                    },
                    {
                        name: '4433选基',
                        url: '/fund4433',
                        image: svgpurse
                    },
                    {
                        name: '自选基金',
                        url: '/optionalFund',
                        image: svgmine
                    }
                ],
                choicenessList: [{
                        name: '招商理财30天债券A',
                        rate: '0.0521'
                    },
                    {
                        name: '招商理财60天债券B',
                        rate: '0.0645'
                    }
                ],
                hotFundList: [{
                        dateText: '近一年收益',
                        rate: '0.052442',
                        name: '建信深证60联接1',
                        minText: '10元起购',
                        riskText: '低风险',
                        typeText: '混合型'
                    },
                    {
                        dateText: '近一年收益',
                        rate: '0.0641.17',
                        name: '建信深证60联接2',
                        minText: '100元起购',
                        riskText: '中风险',
                        typeText: '混合型'
                    },
                    {
                        dateText: '近一年收益',
                        rate: '0.0719.75',
                        name: '建信深证60联接3',
                        minText: '100元起购',
                        riskText: '高风险',
                        typeText: '混合型'
                    }
                ]
            }
        },
        methods: {
            goSubject(item) {
                APP.openWin(item.url);
            },
            goChoiceness(item) {
                APP.openWin('/fundDetails');
            },
            goHotFund() {
                APP.openWin('/fundDetails');
            },
            goPage(data) {
                APP.openWin(data);
            },
            /*滚动监听*/
            mScroll: _.throttle(() => {
                colorProportion = $recommend.get(0).scrollTop / 200;
                opacity = colorProportion < 0.5 ? colorProportion : 0.5;
                $searchMain.css('background-color', `rgba(172,153,153, ${opacity})`);
            }, 50)
        },
        components: {
            Swiper,
            Divider
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #recommend {
        .overflow-auto();
        padding-bottom: 0.5rem;
        .search-main {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            position: fixed;
            top: 0px;
            width: 100%;
            height: 0.45rem;
            z-index: 20;
            .search-input {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                flex: 1;
                margin: 0.06rem 0.1rem;
                width: 100%;
                height: 0.32rem;
                background-color: rgba(255, 255, 255, 1);
                color: #cdcdcd;
                border-radius: 4px;
                .search-icon {
                    font-size: 16px;
                    padding-right: 10px;
                }
                .search-description {
                    font-size: 14px;
                    text-align: center;
                }
            }
        }
        .classify-box {
            display: flex;
            background: #fff;
            .item {
                flex: 1;
                width: 0;
                padding: 0.18rem 0;
                text-align: center;
                .icon-subject {
                    width: 0.3rem;
                    height: 0.3rem;
                }
                .text {
                    margin-top: 8px;
                    color: @litdark-color;
                    font-size: 14px;
                    .word-hide();
                }
            }
        }
        .choiceness-box {
            margin: 0.1rem 0; // background: #fff;
            .item {
                position: relative;
                width: 100%;
                overflow: hidden;
                padding: 22px;
                border-bottom: 1px solid #f3f4f7;
                background-color: #fff;
                background-size: 100% 100%;
                background-image: url(../../../static/image/decorate.png);
                .icon-text {
                    position: absolute;
                    top: 10px;
                    right: -32px;
                    width: 100px;
                    height: 18px;
                    line-height: 18px;
                    font-size: 12px;
                    background-image: @colorful-color;
                    color: #fff;
                    text-align: center;
                    transform: rotate(45deg);
                }
                .name {
                    margin-bottom: 0.15rem;
                    color: @dark-color;
                    font-size: 0.18rem;
                    .word-hide();
                }
                .rate {
                    margin-bottom: 0.08rem;
                    font-size: 0.3rem;
                    color: @primary-color;
                }
                .text {
                    margin-bottom: 0.2rem;
                    font-size: 0.14rem;
                    color: #a8a8a8;
                }
                .btn-buy {
                    margin: 0 auto;
                    width: 2.20rem;
                    height: 0.36rem;
                    line-height: 0.36rem;
                    background: @primary-color;
                    text-align: center;
                    color: #fff;
                    font-size: 16px;
                }
                .text-center {
                    text-align: center;
                }
            }
        }
        .hot-box {
            background: #fff;
            .top-pan {
                display: flex;
                align-items: center;
                width: 100%;
                padding: 12px;
                .title {
                    flex: 0 0 1rem;
                    line-height: 1;
                    width: 1rem;
                    padding-left: 4px;
                    color: @dark-color;
                    border-left: 3px solid @primary-color;
                }
                .more {
                    flex: 1;
                    color: @gray-color;
                    text-align: right;
                    .icon {
                        margin-left: 0.06rem;
                        .triangle-right();
                    }
                }
            }
            .content-pan {
                .item {
                    padding: 0.12rem 0 0.12rem 0.2rem;
                    display: flex;
                    border-top: 1px solid #f3f4f7;
                    .left-pan {
                        display: flex; // justify-content: space-between;                   
                        flex-direction: column;
                        width: 1.1rem;
                        border-right: 1px solid #f3f4f7;
                        .rate {
                            font-size: 24px;
                            color: @primary-color;
                            margin-bottom: 5px;
                        }
                        .text {
                            font-size: 12px;
                            color: #a8a8a8;
                        }
                    }
                    .right-pan {
                        flex: 1;
                        padding-left: 0.34rem;
                        padding-right: 0.04rem;
                        .name {
                            font-size: 17px;
                            color: @dark-color;
                            margin-bottom: 14px;
                            .word-hide();
                        }
                        .detail {
                            color: #a8a8a8;
                            font-size: 12px;
                            .text {
                                .border-r-1px();
                                padding-right: 0.08rem;
                                &:last-child {
                                    padding-right: 0;
                                    &::after {
                                        display: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>