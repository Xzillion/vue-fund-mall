<template>
    <div id="hotFundRanking">
        <title-bar title="热门排行" back-path="/home" :isColorful="true">
            <i class="iconfont icon-search" @click="search"></i>
        </title-bar>
        <div id="fund-type" class="fund-type">
            <div v-for="(item,index) in fundType" class="type-item" @click="chooseFundType(index)" :key="index">
                <span class="fund-type-name" :class="{'choose-item':(choosedFundType == index)}">{{item}}</span>
            </div>
        </div>
        <div class="main">
            <list 
                :titles="listTitles" 
                :data="listData" 
                :title-style="listDataStyle" 
                :data-style="listDataStyle" 
                :do-red-green="doRedGreen" 
                :load-more="loadMore"
                @tapContentLine="tapListItem"
                v-show="isShowList">
            </list>
            <empty-view v-show="!isShowList" message="暂无热门排行数据" :needLogin="needLogin"></empty-view>
        </div>
    </div>
</template>
<script>    
    export default {
        name: 'optionalFund',
        mounted() {
            
        },
        data() {
            return {
                loadMore: false,
                fundType: ["全部", "货币型", "混合型", "债券型", "指数型", "股票型"],
                choosedFundType: 0,
                chooseOrder: "日涨幅",
                needLogin: false,
                doRedGreen: ['dayRate'],
                listDataStyle: {
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
            isShowList(){
                return this.listData.length ? true : false;
            }
        },
        methods: {            
            chooseFundType(index){
                this.choosedFundType = index;
            },            
            search(){
                APP.openWin("/selectFund")
            },
            tapListItem() {
                APP.openWin("/fundDetails");
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";

    #hotFundRanking {
        .page-style();
        .fund-type {
            display: flex;
            flex-flow: row nowrap;
            height: 40px;
            line-height: 40px;
            width: 100%;
            background: @colorful-color;
            margin-top: -2px;
            z-index: 100;
            padding: 0 4px;
            overflow: scroll;
            .type-item {
                flex: 1 0 auto;
                height: 100%;
                color: @white-color;
                padding: 0 12px;
                font-size: 14px;
                .fund-type-name {
                    width: auto;
                    padding: 5px 0;
                }
            }
            .choose-item {
                border-bottom: 2px solid rgba(255, 255, 255, 1);
            }
        }
        .main {
            flex: 1;
            // height: 100%;
            overflow: hidden;
        }
        .edit {
            width: auto;
            margin-left: 20px;
            font-size: 16px;
        }
    }
</style>