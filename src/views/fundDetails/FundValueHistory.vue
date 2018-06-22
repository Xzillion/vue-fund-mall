<template>
    <div id="fundValueHistory">
        <title-bar title=历史净值 :isColorful="true"></title-bar>
        <div class="main-column-box">
            <list 
                :titles="listTitles" 
                :data="listData"
                :titleStyle="listItemStyle" 
                :dataStyle="listItemStyle"
                :doRedGreen="doRedGreen"
                :loadMore="loadMore">
            </list>
        </div>
    </div>
</template>
<script>
    export default {
        name: "fundValueHistory",
        mounted() {
            
        },
        data() {
            return {
                loadMore: false,
                doRedGreen: ['dayRate'],
                listItemStyle: {
                    date: {
                        flex: '0 0 90px',
                        color: '#999'
                    },
                    perVal: {
                        flex: 1,
                        'text-align': 'right'
                    },
                    totalVal: {
                        flex: 1,
                        'text-align': 'right'
                    },
                    dayRate: {
                        flex: 1,
                        'text-align': 'right'
                    }
                },
                listTitles: [{
                    value: '日期',
                    key: 'date'
                }, {
                    value: '单位净值',
                    key: 'perVal'
                }, {
                    value: '累计净值',
                    key: 'totalVal'                    
                }, {
                    value: '日涨幅',
                    key: 'dayRate'       
                }],
                listData: [
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },                    
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    },
                    {
                        date: '2017-12-23',
                        perVal: '0.1246',
                        totalVal: '212.12',
                        dayRate: '+12.212'
                    }
                ]
            }
        },
        methods: {
        }
    };
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #fundValueHistory {
        .page-style();
        .main-column-box {
            background: #fff;
        }
    }
</style>