<template>
    <div id="asset">
        <div class="header-box">
            <div class="header"> 
                <div class="left-pan">
                    <p class="text">总资产(元)</p>
                    <p class="money" v-fixed2small="{val: allMoney}"></p>
                </div>   
                <div class="right-img"></div>                
            </div>
            <div class="income-box">
                <div class="item yesterday">
                    <p class="text">昨日收益(元)</p>
                    <div class="income add" :class="{lose: earningYesterday < 0}">
                        <span>{{earningYesterday > 0 ? '+' : ''}}</span><span v-fixed2small="{val: earningYesterday}"></span>
                    </div>
                </div>
                <div class="item hold">
                    <p class="text">持有收益(元)</p>
                    <div class="income add" :class="{lose: holdingGains < 0}">
                        <span>{{holdingGains > 0 ? '+' : ''}}</span><span v-fixed2small="{val: holdingGains}"></span>
                    </div>
                </div>
                <div class="item total">
                    <p class="text">累计收益(元)</p>
                    <div class="income add" :class="{lose: accumulatedEarning < 0}">
                        <span>{{accumulatedEarning > 0 ? '+' : ''}}</span><span v-fixed2small="{val: accumulatedEarning}"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-layout">
            <list 
                :data="listData" 
                :titles="listTitles" 
                :showLoadPan="false"
                :titleStyle="listItemStyle" 
                :dataStyle="listItemStyle"
                :doRedGreen="doRedGreen" 
                @tapContentLine="tapListItem">
            </list>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    const listStyle = {
        fundName: {
            flex: 2
        },
        marketVal: {
            flex: 2,
            'text-align': 'right'
        },
        earningYesterday: {
            flex: 2,
            'text-align': 'right'
        },
        earningholding: {
            flex: 2
        }
    }
    export default {
        name: 'asset',
        data() {
            return {                
                allMoney: 108002.14, //总资产
                earningYesterday: -29.23,
                holdingGains: 129.23,
                accumulatedEarning: 1029.23,
                productList: [],

                doRedGreen: ['earningYesterday', 'earningholding'],
                listItemStyle: {},
                listTitles: [{
                    value: '基金名称',
                    key: 'fundName'
                }, {
                    value: '当前市值',
                    key: 'marketVal'
                }, {
                    value: '昨日收益',
                    key: 'earningYesterday'
                }, {
                    value: '持有收益',
                    key: 'earningholding'
                }],
                listData: [
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.12',
                        'earningYesterday': '+124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.13',
                        'earningYesterday': '+124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.14',
                        'earningYesterday': '-124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.14',
                        'earningYesterday': '+124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.14',
                        'earningYesterday': '+124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.14',
                        'earningYesterday': '-124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.14',
                        'earningYesterday': '+124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.14',
                        'earningYesterday': '+124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.14',
                        'earningYesterday': '+124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.14',
                        'earningYesterday': '+124',
                        'earningholding': '+23453'
                    },
                    {
                        'fundName': '杭州证券银行',
                        'marketVal': '1234.15',
                        'earningYesterday': '+124',
                        'earningholding': '+23453'
                    }
                ]


            }
        },
        created() {
            this.listItemStyle = listStyle;
            this.$store.commit('buttomBarActiveKey', 'asset');            
        },
        methods: {
            tapListItem(data) {
                // console.log(data);
                utils.setData('detailAssetItem', data);
                APP.openWin('/myDetailAsset');
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #asset {
        .overflow-auto();
        padding-bottom: 0.5rem;
        display: flex;
        flex-flow: column nowrap;
        .header-box{
            background-image: @colorful-color;
            margin-bottom: 10px;
        }
        .header {        
            display: flex;    
            color: #fff;
            padding: 0.37rem 0 1px 0.24rem;
            .left-pan{
                padding: 0.2rem 0;
                flex: 1;
            }
            .right-img{
                width: 1.3rem;
                background-size: 100% 100%;
                background-image: url(../../../static/image/asset.png);
            }
            .text {     
                opacity: 0.7;           
                font-size: 0.16rem;                
            }
            .money {               
                font-size: 0.27rem;                
            }
        }
        .income-box {
            display: flex;
            background-color: rgba(255,255,255,0.1);
            padding: 0.16rem 0;            
            .item {
                flex: 1;
                width: 100%;
                .border-r-1px();
                color: #fff;
                text-align: center;
                &:last-child::after {
                    border: none;
                }
                .text {
                    font-size: 0.12rem;
                    opacity: 0.7;
                    margin-bottom: 4px;
                }
                .income {
                    font-size: 0.18rem;
                }
            }
        }
        .product-layout {            
            flex: 1;
            width: 100%;
            overflow: auto;
        }
        .list-title {
            display: flex;
            background: #fff;
            .border-b-1px();
            .item {
                flex: 1;
                padding: 10px 0;
                width: 100%;
                font-family: PingFangSC-Regular;
                font-size: 0.13rem;
                color: #666;
                text-align: center;
            }
        }
        .product-list {
            .product {
                display: flex;
                padding: 10px 0;
                background: #fff;
                .border-b-1px();
                .item {
                    flex: 1;
                    width: 100%;
                    text-align: center;
                    color: #333;
                    font-size: 14px;
                }
                .add {
                    color: @primary-color;
                }
                .lose {
                    color: @lose-color;
                }
            }
        }
    }
</style>
