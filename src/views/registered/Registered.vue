<template>
    <div id="registered">
        <title-bar title="手机注册" :show-close="false"></title-bar>
        <div class="main-column-box main">
            <div class="main-mes">
                <div class="mes-description">请输入手机号码</div>
                <div class="mes-phone">
                    <div class="mes-phone-value">+86</div>
                    <input type="tel" v-model="phone" maxlength="11" v-focus placeholder="请输入11位手机号码">
                    <span class="iconfont icon-empty mes-clean" v-show="isShowEmpty" @click="phone=''"></span>
                </div>
                <div class="btn btn-primary btn-sure" @click="confirm" v-btntouch>确定</div>
            </div>
        </div>
    </div>
</template>
<script>
    import utils from 'js/utils'
    export default {
        name: 'login',
        mounted() {

        },
        data() {
            return {
                isShowEmpty: false,
                phone: ""
            }
        },
        methods: {
            confirm(){
                if(!utils.checkMobile(this.phone)) {
                    utils.toast('手机格式有误');
                    return;
                }
                utils.setData('phone', this.phone);
                APP.openWin("/registeredSMS");
            }
        },
        watch: {
            phone(val) {
                this.isShowEmpty = val.length >0 ? true: false;
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #registered {
        .page-style();
        .main {
            margin-top: 8px;
            background: @white-color;
            .main-mes {
                display: flex;
                flex-flow: column nowrap;
                margin: 0 20px;
                overflow: hidden;
                .mes-description {
                    flex: 1;
                    width: 100%;
                    margin: 60px 0 0;
                    padding-left: 10px;
                    font-size: 20px;
                    color: @dark-color;
                }
                .mes-phone {
                    flex: 1;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    margin: 46px 0 0;
                    height: 50px;
                    padding:0 10px;
                    .border-b-1px();
                    .mes-phone-value {                        
                        width: 60px;                        
                        font-size: 20px;                        
                        color: @dark-color;
                    }
                    input{
                        height: 100%;
                        flex: 1;   
                        font-size: 20px;                     
                    }
                }
                .btn-sure {
                    flex: 1;
                    margin: 30px 0;
                    width: 100%;
                    height: 45px;
                    text-align: center;
                    line-height: 45px;
                    border-radius: 3px;
                    font-size: 16px;
                }
            }
        }
    }
</style>