<template>
    <div id="bankCardManage">
        <title-bar title="银行卡管理" back-path="/home/mine">
            <i class="iconfont icon-add" @click="addCard" v-if="isShowBankCard"></i>
        </title-bar>
        <div class="main-column-box">
            <!-- 未添加过银行卡界面 -->
            <div class="noBankCardBox" v-if="!isShowBankCard">
                <div class="icon-pan">
                    <span class="iconfont icon-nocard"></span>
                    <p class="text">您暂无添加银行卡</p>
                </div>
                <div class="btn btn-primary btn-add" @click="addCard" v-btntouch>
                    <i class="iconfont icon-add"></i>添加银行卡
                </div>
            </div>
            <!-- 已添加过银行卡界面 -->
            <div class="bankCardBox" v-if="isShowBankCard">
                <div class="card-item" :style="getCardBackground(item)" v-for="(item, index) in cardList" :key="index" @click="showDeleteCard(item, index)">
                    <div class="quick-payment">
                        <span>快捷</span>
                        <span class="pay-text" :style="payTextColor(item)">支付</span>
                    </div>
                    <div class="name-line">
                        <span class="icon" :style="getIcon(item)"></span>
                        <span class="bank-name">{{item.bankName}}</span>
                        <span class="card-kind">{{item.cardKing}}</span>
                    </div>
                    <div class="cardnum-line">
                        {{item.cardNum | formatCardNum}}
                    </div>
                    <div class="tip-line">
                        {{item.info}}
                    </div>
                </div>
            </div>
        </div>
        <action-sheet title="您可对7765尾号招商银行的储蓄卡进行操作" @tapIndex="tapIndex" :isShow="isShowActionSheet"></action-sheet>
    </div>
</template>
<script>
    import zsyhPng from 'src/assets/bank_icon/zsyh.png'
    import jtyhPng from 'src/assets/bank_icon/jtyh.png'
    import nyyhPng from 'src/assets/bank_icon/nyyh.png'
    const bankStyle = {
        '招商银行': {icon: 'url('+zsyhPng+')', gradient: 'linear-gradient(-224deg, #fc5a9e 0%, #ffa75f 100%)', payColor: '#fc5a9e'},
        '交通银行': {icon: 'url('+jtyhPng+')', gradient: 'linear-gradient(-224deg, #359ef8 0%, #6bccf8 100%)', payColor: '#359ef8'},
        '农业银行': {icon: 'url('+nyyhPng+')', gradient: 'linear-gradient(-224deg, #20c084 0%, #70ec9e 100%)', payColor: '#20c084'}
    }
    export default {
        name: 'bankCardManage',
        data() {
            return {
                isShowActionSheet: false,
                isShowBankCard: true,
                delCardIndex: -1,
                cardList: [{
                        icon: '',
                        bankName: '招商银行',
                        cardKing: '储蓄卡',
                        cardNum: '6000234234343461',
                        info: '单笔5万    单日10万    单月1000万'
                    },
                    {
                        icon: '',
                        bankName: '交通银行',
                        cardKing: '储蓄卡',
                        cardNum: '6000234234343461',
                        info: '单笔5万    单日10万    单月1000万'
                    },
                    {
                        icon: '',
                        bankName: '农业银行',
                        cardKing: '储蓄卡',
                        cardNum: '6000234234343461',
                        info: '单笔5万    单日10万    单月1000万'
                    }
                ]
            }
        },
        methods: {
            payTextColor(item) {
                return {
                    'color': bankStyle[item.bankName]['payColor']
                }
            },
            getIcon(item) {                
                return {
                    'background-image': bankStyle[item.bankName]['icon']
                }
            },
            getCardBackground(item) {                
                return {
                    'background-image': bankStyle[item.bankName]['gradient']
                }
            },
            tapIndex(item) {
                this.isShowActionSheet = false;
                // console.log(index);
                if (item.key == 'delete') {
                    this.$utils.showPasswordView({
                       callbackFn: (data)=> {
                            if(data.status == 2) {
                                //ajax delete card
                                this.cardList.splice(this.delCardIndex, 1);
                            }
                        }
                    });
                }
            },
            addCard() {
                APP.openWin('/addBankCard');
            },
            showDeleteCard(item, index) {
                this.delCardIndex = index;
                this.isShowActionSheet = true;
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #bankCardManage {
        .page-style();
        .noBankCardBox {
            .icon-pan {
                margin: 100px 0 46px;
                text-align: center;
                color: #cdcdcd;
                .iconfont {
                    font-size: 80px;
                }
                .text {
                    margin-top: 20px;
                    font-size: 16px;
                }
            }
            .btn-add {
                width: auto;
                margin: 0 16px;
                .iconfont {
                    margin-right: 5px;
                }
            }
        }
        .bankCardBox {
            margin: 10px;
            .card-item {
                position: relative;
                width: 100%;
                border-radius: 4px;
                background-color: #ef3f62;
                height: 100px;
                padding: 14px 16px;
                margin-bottom: 10px;
                .quick-payment {
                    position: absolute;
                    right: 6px;
                    top: 6px;
                    color: #fff;
                    font-size: 12px;
                    transform: skew(-15deg) scale(0.8);
                    .pay-text{                        
                        background-color: #fff;
                        padding: 0 2px;
                        border-radius: 4px;
                    }
                }
                .name-line {
                    .icon {
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        background-size: 100% 100%;
                        vertical-align: middle;
                    }
                    .bank-name {
                        letter-spacing: 0;
                        font-size: 16px;
                        color: #fff;
                    }
                    .card-kind {
                        letter-spacing: 0;
                        font-size: 12px;
                        color: #fff;
                    }
                }
                .cardnum-line {
                    color: #fff;
                    font-size: 20px;
                    padding-left: 30px;
                    margin: 4px 0 6px;
                }
                .tip-line {
                    opacity: 0.6;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
    }
</style>

