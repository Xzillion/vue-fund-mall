<template>
    <div id="optionalFund">
        <title-bar title="自选基金" :show-close="false" :isColorful="true" back-path="/home">
            <i class="iconfont icon-search" @click="search"></i>
            <span v-if="isShowList" class="edit" @click="doEdit">{{editText}}</span>
        </title-bar>
        <div class="main">
            <list 
                v-show="isShowList"
                :titles="listTitles" 
                :data="listData"
                :title-style="listItemStyle" 
                :data-style="listItemStyle"
                :do-red-green="doRedGreen"
                :del-status="delStatus"
                :load-more="loadMore"
                :filter-list="filterList" >
            </list>
            <empty-view v-show="!isShowList" message="暂无自选数据" :needLogin="needLogin"></empty-view>
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
                delStatus: false, //列表是否是编辑状态
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
                listData: [
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
                ],                
                showEdit: false,                
                needLogin: false,
                filterList: [
                    {
                        key: '1',
                        value: '日涨幅',
                        selected: true
                    },
                    {
                        key: '2',
                        value: '月涨幅',
                        selected: false
                    },
                    {
                        key: '3',
                        value: '年涨幅',
                        selected: false
                    }
                ]
            }
        },
        computed: {
            isShowList(){
                return this.listData.length ? true : false;
            },
            editText() {
                return this.delStatus? '完成' : '编辑';
            }
        },
        methods: {
            doEdit() {
                this.delStatus = !this.delStatus;                
            },
            search(){
                APP.openWin('/selectFund');
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #optionalFund {
        display: flex;
        flex-flow: column nowrap;
        .page-style();
        .main {
            flex: 1;
            height: 100%;
            overflow: hidden;
            position: relative;
        }
        .edit {
            width: auto;
            margin-left: 20px;
            font-size: 16px;
        }
    }
</style>