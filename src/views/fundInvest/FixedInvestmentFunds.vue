<template>
    <div id="fixedInvestmentFunds">
        <title-bar title="定投专区" :isColorful="true" v-show='isShowNavBar' back-path="/home">
            <i class="iconfont icon-search" @click="search"></i>
        </title-bar>
        <div class="tab-bar">
            <div class="content">
                <span :class="{active: isShowMovement}" @click="isShowMovement=true">定投排行</span>
            </div>
            <div class="content">
                <span :class="{active: !isShowMovement}" @click="isShowMovement=false">我的定投</span>
            </div>
        </div>
        <div class="main-column-box">
            <div class="funds-ranking" v-show='isShowMovement'>
                <list 
                    v-show="isShowList"
                    :titles="listTitles" 
                    :data="listData" 
                    :title-style="listItemStyle" 
                    :data-style="listItemStyle" 
                    :do-red-green="doRedGreen" 
                    :load-more="loadMore"                    
                    @tapContentLine="tapListItem" 
                    @loadMoreEvent="loadMoreEvent">
                </list>
                <empty-view v-show="!isShowList" message="暂无数据" :needLogin="isNeedLogin"></empty-view>
            </div>
            <div class="my-funds" v-show='!isShowMovement'>   
                <div v-if="isShowMyFundList">
                    <div class="all" v-for="(item, index) in myFunds" :key="index" @click="goMyPageDetail(item)" v-touch>
                        <p>{{item.name}}<span>{{item.code}}</span></p>
                        <div class="product">
                            <div class="item-left item">累计定投金额</div>
                            <div class="item-right item">{{item.totleMoney}}元</div>
                        </div>
                        <div class="product">
                            <div class="item-left item">累计份额</div>
                            <div class="item-right item">{{item.totleShare}}元</div>
                        </div>
                        <div class="product">
                            <div class="item-left item">下次扣款日期</div>
                            <div class="item-right item">{{item.date}}</div>
                        </div>
                    </div>
                </div>                
                <empty-view v-if="!isShowMyFundList" :needLogin="isNeedLogin" message="无定投计划"></empty-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'fixedInvestmentFunds',
        mounted() {
           
        },
        data() {
            return {                
                json: [],
                page: 0,                
                isShowMovement: true,
                isShowNavBar: true,
                isShowMyFundList: true, //是否显示我的定投列表
                isNeedLogin: false,     //是否展示登录再查看按钮
                myFunds: [
                    {
                        name: '南方稳健壹号',
                        code: '234533',
                        totleMoney: '100',
                        totleShare: '100',
                        date: '2017-10-26'
                    },
                    {
                        name: '南方稳健壹号2',
                        code: '234513',
                        totleMoney: '200',
                        totleShare: '100',
                        date: '2017-10-26'
                    },
                    {
                        name: '南方稳健壹号2',
                        code: '264533',
                        totleMoney: '300',
                        totleShare: '100',
                        date: '2017-10-26'
                    },
                    {
                        name: '南方稳健壹号2',
                        code: '234833',
                        totleMoney: '100',
                        totleShare: '400',
                        date: '2017-10-26'
                    },
                    {
                        name: '南方稳健壹号3',
                        code: '230533',
                        totleMoney: '100',
                        totleShare: '100',
                        date: '2017-10-26'
                    }                    
                ],
                loadMore: false,
                doRedGreen: ['dayRate'],
                listItemStyle: {
                    'fundName/fundCode': {
                            flex: 4
                        },
                        perVal: {
                            flex: 2
                        },
                        dayRate: {
                            flex: 3
                        }
                },
                listTitles: [{
                    value: '基金名称/代码',
                    key: 'fundName/fundCode'
                }, {
                    value: '单位净值',
                    key: 'perVal'
                }, {
                    value: '日涨幅',
                    key: 'dayRate',
                    canClick: true
                }],
                listData: [{
                        'fundName/fundCode': '杭州证券银行/123456',
                        perVal: '0.12467',
                        dayRate: '+3.1213%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        perVal: '0.1267',
                        dayRate: '-3.1212%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        perVal: '0.12167',
                        dayRate: '3.1212%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        perVal: '0.12367',
                        dayRate: '3.1122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行4/123456',
                        perVal: '0.1267',
                        dayRate: '3.122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        perVal: '0.12667',
                        dayRate: '3.1522%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行5/123456',
                        perVal: '0.1267',
                        dayRate: '3.122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行6/123456',
                        perVal: '0.1267',
                        dayRate: '3.1122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        perVal: '0.1267',
                        dayRate: '3.122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行7/123456',
                        perVal: '0.1267',
                        dayRate: '3.1122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        perVal: '0.13267',
                        dayRate: '3.122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行8/123456',
                        perVal: '0.1267',
                        dayRate: '3.7122%'
                    }
                ]
            }
        },
        computed: {
            isShowList() {
                return this.listData.length ? true : false;
            }
        },
        methods: {
            tapListItem() {},
            loadMoreEvent() {},
            goMyPageDetail(item) {
                APP.openWin('/investDetail');
            },
            search() {
                APP.openWin('/selectFund');
            }
        }
    }
</script>

<style lang="less">
    @import "../../common/style/common.less";
    #fixedInvestmentFunds {        
        .page-style();
        .hs-titleBar {
            border-bottom: none;
        }
        .tab-bar {
            display: flex;
            color: #fff;
            width: 100%;
            background-image: @colorful-color;
            padding: 4px 0 14px;
            .content {
                flex: 1;                
                font-size: 16px;
                text-align: center;
                span {
                    padding-bottom: 8px;
                    &.active {
                        color: #fff;
                        border-bottom: 2px solid #fff;
                    }
                }
            }
        }
        .main-column-box {
            display: flex;
        }
        .funds-ranking {
            flex-direction: column;
            display: flex;
            width: 100%;
        }
        .my-funds {
            flex: 1;
            width: 100%;
            .all {
                background: #fff;
                border-radius: 6px;
                margin: 12px;
                font-size: 18px;
                line-height: 16px;
                p {
                    font-size: 16px;
                    color: @dark-color;                   
                    .border-b-1px();
                    padding: 15px;
                    span {
                        font-family: HelveticaNeue;
                        font-size: 12px;
                        color: @gray-color;
                        line-height: 12px;
                        margin-left: 8px;
                    }
                }
                .product {
                    display: flex;
                    .item {
                        flex: 1;
                        font-size: 14px;                        
                        margin: 10px 16px;
                    }
                    .item-left {
                        color: @gray-color;
                        text-align: left;
                    }
                    .item-right {
                        color: @dark-color;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
