<template>
    <transition name="transition-fade-out">
        <div class="hs-toast" v-show="showToast">
            {{toastText}}
        </div>
    </transition>    
</template>
<script>   
    var timer = null;
    export default {
        name: 'hs-toast',
        data() {
            return {
                showToast: false,
                toastText: ''
            }
        },
        created() {
            /* 展示 */
            this.$bus.on('showToast', (text,time=2500)=> {
                this.toastText = text;
                this.showToast = true;

                clearTimeout(timer);
                timer = setTimeout(() => {                    
                    this.showToast = false;                    
                }, time);

            });

            /* 隐藏 */
            this.$bus.on('hideToast', ()=> {
                clearTimeout(timer);
                this.showToast = false;
            });
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    .hs-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        text-align: center;
        transform: translate(-50%, -50%);
        padding: 10px 12px;
        width: 60%;            
        font-size: 14px;
        border-radius: 12px;
        min-width: 100px;
    }
</style>
