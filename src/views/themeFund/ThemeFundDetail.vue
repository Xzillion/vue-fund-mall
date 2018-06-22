<template>
    <div id="themeFundDetail">
        <title-bar :title="title" :isColorful="true">
            <i class="iconfont icon-search" @click="search"></i>
        </title-bar>
        <div class="top-box">
            <div class="item left-pan" @click="select">
                <p class="percent" v-percent="{val: '0.065'}"></p>
                <p class="name">
                    <span>{{increaseVal[0]}}</span>
                    <span class="triangle"></span>
                </p>
            </div>
            <div class="item right-pan">
                <p class="">
                    <span class="ranking">71</span>
                    <span class="total">/208</span>
                </p>
                <p class="name">排名</p>
            </div>
        </div>
        <div class="list-box">
            <list 
                :titles="listTitles" 
                :data="listData" 
                :titleStyle="listTitleStyle" 
                :dataStyle="listDataStyle" 
                :doRedGreen="doRedGreen" 
                :loadMore="loadMore" 
                :delStatus="delStatus"
                :isSuportRefresh="true"
                :refreshMore="refreshMore"
                @tapContentLine="tapListItem" 
                @loadMoreEvent="loadMoreEvent"
                @refresh="listRefresh">
            </list>
        </div>         
        <popup-picker :show.sync="showIncreasePicker" :data="increaseList" :show-cell="false" v-model="increaseVal"></popup-picker>
    </div>
</template>
<script>
    import utils from 'js/utils'
    import {
        PopupPicker
    } from 'vux'
    // import list from 'src/components/List/Default.vue'
    const listStyle = {
        'fundName/fundCode': {
            flex: 4
        },
        perVal: {
            flex: 2
        },
        dayRate: {
            flex: 3
        }
    }
    export default {
        name: 'themeFundDetail',
        created() {            
            this.listDataStyle = listStyle;
            this.listTitleStyle = listStyle;
        },
        mounted() {
            this.title = this.$route.query.title;
            setTimeout(() => {
                this.listData = [{
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
            }, 1000);
        },
        data() {
            return {
                refreshMore: true,
                delStatus: false,
                count: 0,
                loadMore: true,
                doRedGreen: ['dayRate'],
                listDataStyle: {
                    
                },
                listTitleStyle: {
                    
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
                listData: [],
                showIncreasePicker: false,
                title: '',
                increaseVal: ['日涨幅'],
                increaseList: [
                    ['日涨幅', '周涨幅', '月涨幅', '季涨幅', '年涨幅']
                ]
            }
        },
        methods: {
            listRefresh() {
                this.count++;
                if (this.count < 3) {
                    setTimeout(() => {
                        this.listData.unshift({
                            'fundName/fundCode': '杭州证券银/123458',
                            perVal: '13.16261',
                            dayRate: '20.122%'
                        })
                    }, 1000);
                } else {
                    this.refreshMore = false;
                }               
                
            },
            loadMoreEvent() {                
                this.count++;
                if (this.count < 5) {
                    setTimeout(() => {
                        this.listData.push({
                            'fundName/fundCode': '杭州证券银/123456',
                            perVal: '13.16267',
                            dayRate: '13.122%'
                        })
                    }, 1000);
                    
                } else {
                    this.loadMore = false
                }
            },
            tapListItem(item) {
                APP.openWin('/fundDetails');
                // console.log(item)
            },
            select() {
                this.showIncreasePicker = true;
            },
            search() {
                // this.delStatus = !this.delStatus
                APP.openWin('/selectFund');
            }
        },
        components: {
            PopupPicker            
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #themeFundDetail {
        .page-style();               
        .top-box {
            display: flex;
            margin-bottom: 10px;
            padding: 16px;
            background: #fff;
            .item {
                flex: 1;
                text-align: center;
                .name {
                    color: @gray-color;
                    font-size: 13px;
                    margin-top: 4px;
                }
            }
            .left-pan {
                .border-r-1px();
                .percent {
                    font-size: 26px;
                    color: @primary-color;
                    line-height: 1;
                }
                .triangle {
                    .triangle-down();
                    margin: -2px 0 0 2px;
                }
            }
            .right-pan {
                .ranking {
                    font-size: 20px;
                    color: @primary-color;
                }
                .total {
                    font-size: 20px;
                }
            }
        }
        .list-box {
            // height: 100%;            
            flex: 1;           
            overflow: auto; // -webkit-overflow-scrolling: touch;            
        }
    }
</style>
