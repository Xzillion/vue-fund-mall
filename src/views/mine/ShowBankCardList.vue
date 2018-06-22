<template>
    <div id="showBankCardList">
        <title-bar title="选择银行"></title-bar>
        <div class="content-box">
            <div class="item" v-for="(item, index) in list" :key="index" @click="selectBank(item)">
                <span class="icon" :style="getIcon(item)"></span>
                <span class="name">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    import zsyhPng from 'src/assets/bank_icon/zsyh.png'
    import jtyhPng from 'src/assets/bank_icon/jtyh.png'
    import nyyhPng from 'src/assets/bank_icon/nyyh.png'
    import jsyhPng from 'src/assets/bank_icon/jsyh.png'
    var bankObj = {
        '1': jtyhPng,
        '2': zsyhPng,
        '3': jsyhPng,
        '4': nyyhPng
    }
    export default {
        name: 'showBankCardList',
        data() {
            return {
                list: [{
                        name: '交通银行',
                        code: '1'
                    },
                    {
                        name: '招商银行',
                        code: '2'
                    },
                    {
                        name: '中国建设银行',
                        code: '3'
                    },
                    {
                        name: '中国农业银行',
                        code: '4'
                    }
                ]
            }
        },
        methods: {
            getIcon(item) {
                return {
                    'background-image': 'url(' + bankObj[item.code] + ')'
                }
            },
            selectBank(item) {
                utils.setData('selectedbankObj', item);
                APP.closeWin();
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #showBankCardList {
        .page-style();
        .content-box {
            background-color: #fff;
            margin-top: 10px;
            .item {
                display: flex;
                align-items: center;
                padding: 10px 10px 10px 0;
                margin-left: 16px;
                .border-b-1px();
                .icon {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    margin-right: 6px;
                    background-size: 100% 100%;
                }
                .name {
                    flex: 1;
                    color: @dark-color;
                    font-size: 16px;
                }
            }
        }
    }
</style>