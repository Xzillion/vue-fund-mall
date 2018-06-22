<template>    
    <div class="hs-alert">
        <transition name="transition-fade-in-out">
            <div class="alert-mask" v-show="showAlert"></div>
        </transition>
        <transition name="transition-fade-in-out">
            <div class="alert-content" v-show="showAlert">
                <p class="alert-text">{{alertText}}</p>
                <div class="alert-btn" @click="close">{{alertBtnText}}</div>
            </div>
        </transition>
    </div>    
</template>
<script>    
    export default {
        name: 'hs-toast',
        data() {
            return {
                showAlert: false,
                alertText: '',
                alertBtnText: '确定',
                callbackFn: null
            }
        },
        created() {
            /* 展示 */
            this.$bus.on('showAlert', data=> {
                if(typeof(data) === 'string') {
                    this.alertText = data;
                    this.alertBtnText = '确定';
                } else if (typeof(data) === 'object') {
                    this.alertText = data.text;
                    this.alertBtnText = data.btnText || '确定';
                    this.callbackFn = data.onClick;                    
                } else {
                    console.error('传递的参数有误');
                    return;
                }

                this.showAlert = true;                                               
            });

            /* 隐藏 */
            this.$bus.on('hideAlert', ()=> {
                this.showAlert = false;  
                this.callbackFn = null;                
            });
        },
        methods: {
            /* 关闭按钮 */
            close() {
                this.showAlert = false;  
                this.callbackFn && this.callbackFn();
                this.callbackFn = null;
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    .hs-alert {
        .alert-mask {
            position: fixed;
            z-index: 1000;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
        }
        .alert-content {
            position: fixed;
            z-index: 1001;
            width: 70%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            text-align: center;
            border-radius: 8px;
            .alert-text {
                padding: 20px;
                font-size: 16px;
                color: #030303;
            }
            .alert-btn {
                .border-t-1px();
                padding: 16px 20px;
                font-size: 16px;
                color: @primary-color;
            }
        }
    }
</style>
