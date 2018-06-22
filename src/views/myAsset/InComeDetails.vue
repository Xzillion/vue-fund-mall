<template>
    <div id="inComeDetails">
        <title-bar title="收益明细" :isColorful="true"></title-bar>
        <div class="main">
            <list 
                :titles="listTitles"
                :data="listData"
                :doRedGreen="doRedGreen" 
                :title-style="listItemStyle" 
                :data-style="listItemStyle" 
                :loadMore="loadMore" >
                
            </list>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'inComeDetails',
        mounted() {
            
        },
        data() {
            return {
                loadMore: false,
                doRedGreen: ['earningToday'],
                listItemStyle: {
                    date: {
                        'padding-left': '20px'
                    },
                    earningToday: {
                        'padding-right': '20px'
                    }
                },
                listTitles: [{
                    key: 'date',
                    value: '日期'
                }, {
                    key: 'earningToday',
                    value: '当日收益'
                }],
                listData: [{
                    date: '2017-11-12',
                    earningToday: '+12.23'
                }, {
                    date: '2017-11-12',
                    earningToday: '+12.23'
                }, {
                    date: '2017-11-12',
                    earningToday: '+12.23'
                }, {
                    date: '2017-11-12',
                    earningToday: '+12.23'
                }]
            }
        },
        methods: {
            
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #inComeDetails {
        display: flex;
        flex-flow: column nowrap;
        .page-style();
        .main {
            flex: 1;
            // height: 100%;            
            overflow: hidden;
        }
    }
</style>