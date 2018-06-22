<template>
    <div class="hs-confirm">
        <transition name="transition-fade-in-out">
            <div class="confirm-mask" v-show="showConfirm"></div>
        </transition>    
        <transition name="transition-fade-in-out">
            <div class="confirm-content" v-show="showConfirm">
                <p class="confirm-text">{{confirmText}}</p>
                <div class="confirm-btn-bar">
                    <div class="confirm-btn left-btn" @click="close(0)">{{leftBtnText}}</div>
                    <div class="confirm-btn right-btn" @click="close(1)">{{rightBtnText}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'hs-toast',
        data() {
            return {
                showConfirm: false,
                confirmText: '',
                leftBtnText: '取消',
                rightBtnText: '确定',
                onLeftFn: null,
                onRightFn: null
            }
        },
        created() {
            /* 展示 */
            this.$bus.on('showConfirm', data => {
                this.leftBtnText = data.leftBtnText || '取消';
                this.rightBtnText = data.rightBtnText || '确定';
                this.confirmText = data.confirmText;
                this.onLeftFn = data.onLeftFn;
                this.onRightFn = data.onRightFn;
                this.showConfirm = true;
            });
            /* 隐藏 */
            this.$bus.on('hideConfirm', () => {
                this.showConfirm = false;
                this.onLeftFn = null;
                this.onRightFn = null;
            });
        },
        methods: {
            close(status) {
                if (status === 0) {
                    this.onLeftFn && this.onLeftFn();
                } else {
                    this.onRightFn && this.onRightFn();
                }
                this.showConfirm = false;
                this.onLeftFn = null;
                this.onRightFn = null;
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    .hs-confirm {
        .confirm-mask {
            position: fixed;
            z-index: 1000;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
        }
        .confirm-content {
            position: fixed;
            z-index: 1001;
            width: 70%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            text-align: center;
            border-radius: 8px;
            .confirm-text {
                padding: 20px;
                font-size: 16px;
                color: #030303;
            }
            .confirm-btn-bar {
                .border-t-1px();
                display: flex;
                font-size: 16px;
                .confirm-btn {
                    flex: 1;
                    text-align: center;
                    padding: 14px 0;
                }
                .left-btn {
                    color: #999;
                    .border-r-1px();
                }
                .right-btn {
                    color: @primary-color;
                }
            }
        }
    }
</style>
