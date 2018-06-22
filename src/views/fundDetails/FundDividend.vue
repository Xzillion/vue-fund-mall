<template>
    <div id="fundDividend">
        <title-bar title="基金分红" :isColorful="true"></title-bar>
        <div class="main-column-box">
            <list 
                :titles="listTitles" 
                :data="listData" 
                :title-style="listItemStyle" 
                :data-style="listItemStyle" 
                :do-red-green="doRedGreen" 
                :load-more="loadMore">
            </list>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'fundDividend',
        mounted() {
            
        },
        data() {
            return {
                doRedGreen: ['profitMoney'],
                loadMore: false,
                listItemStyle: {
                    interestDate: {
                        flex: 3
                    },
                    profitDate: {
                        flex: 3
                        
                    },
                    profitMoney: {
                        flex: 2
                    }
                },
                listTitles: [{
                    key: 'interestDate',
                    value: '派息日'
                }, {
                    key: 'profitDate',
                    value: '分红日'
                }, {
                    key: 'profitMoney',
                    value: '分红金额'
                }],
                listData: [{
                    interestDate: '2018-12-12',
                    profitDate: '2018-11-11',
                    profitMoney: '2000'
                },{
                    interestDate: '2018-12-12',
                    profitDate: '2018-11-11',
                    profitMoney: '2000'
                },{
                    interestDate: '2018-12-12',
                    profitDate: '2018-11-11',
                    profitMoney: '2000'
                },{
                    interestDate: '2018-12-12',
                    profitDate: '2018-11-11',
                    profitMoney: '2000'
                },{
                    interestDate: '2018-12-12',
                    profitDate: '2018-11-11',
                    profitMoney: '2000'
                },{
                    interestDate: '2018-12-12',
                    profitDate: '2018-11-11',
                    profitMoney: '2000'
                }]
            }
        },
        methods: {
            
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #fundDividend {
        .page-style();
        .main-column-box {
            background: #fff;
            display: flex;
            flex-direction: column;
        }
    }
</style>
