<template>
    <div id="fund4433">
        <title-bar title="4433选基法" :isColorful="true" back-path="/home">
            <i class="iconfont icon-search" @click="search"></i>
            <i class="iconfont icon-explain" @click="goPage"></i>
        </title-bar>
        <div class="main-column-box content-box">
            <div class="info-box">
                <div class="text-pan">
                    <div class="circle-icon"></div>
                    <span class="text">近1年收益率在同类型基金中排名前1/4</span></div>
                <div class="text-pan">
                    <div class="circle-icon"></div>
                    <span class="text">今年以来、两年、三年、五年收益率在同类型基金中排名前1/4</span></div>
                <div class="text-pan">
                    <div class="circle-icon"></div>
                    <span class="text">近3个月收益率在同类型基金中排名前1/3</span></div>
                <div class="text-pan">
                    <div class="circle-icon"></div>
                    <span class="text">近6个月收益率在同类型基金中排名前1/3</span></div>
            </div>
            <div class="list-box">
                <list 
                    :data="listData" 
                    :titles="listTitles" 
                    :showLoadPan="false"
                    :title-style="listItemStyle" 
                    :data-style="listItemStyle"
                    @tapContentLine="tapListItem">
                </list>
            </div>
        </div>
    </div>
</template>
<script>
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
        name: 'fund4433',
        created() {            
            this.listItemStyle = listStyle;            
        },
        data() {
            return {
                listItemStyle: {},                
                listTitles: [{
                    value: '基金名称/代码',
                    key: 'fundName/fundCode'
                }, {
                    value: '单位净值',
                    key: 'perVal'
                }, {
                    value: '日涨幅',
                    key: 'dayRate'
                }],
                listData: [
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        'perVal': '0.1267',
                        'dayRate': '3.122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        'perVal': '0.1267',
                        'dayRate': '3.122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        'perVal': '0.1267',
                        'dayRate': '3.122%'
                    },
                    {
                        'fundName/fundCode': '杭州证券银行/123456',
                        'perVal': '0.1267',
                        'dayRate': '3.122%'
                    }
                ]
            }
        },
        methods: {
            search() {
                APP.openWin('/selectFund');
            },
            tapListItem(item) {
                APP.openWin('/fundDetails');
            },
            goPage() {
                APP.openWin('/fund4433Introduce');
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #fund4433 {
        .page-style();
        .icon-search {
            margin-right: 20px;
        }
        .content-box {
            display: flex;
            flex-direction: column;
        }
        .list-box {
            flex: 1;
            overflow: auto;
        }
        .info-box {
            background: #fff;
            padding: 8px 16px;
            margin-bottom: 10px;
            .text-pan {
                display: flex;
                align-items: flex-start;
                padding: 4px;
                .circle-icon {
                    margin: 6px 4px 0 0;
                    flex: 0 0 5px;
                    width: 5px;
                    height: 5px;
                    border-radius: 5px;
                    background: @primary-color;
                }
            }
        }
    }
</style>