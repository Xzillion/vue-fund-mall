<template>
    <div id="app">
        <!-- 主界面部分 -->
        <transition :name="getJumpAnima()" v-if="isIOS">
            <router-view class="bg"></router-view>
        </transition>
        <router-view class="bg" v-if="!isIOS"></router-view>        
        
        <toast></toast>        
        <loading></loading>        
        <alert></alert>
        <confirm></confirm>
        <!-- 密码校验弹出层 -->
        <password-view></password-view>        
    </div>
</template>
<script>
    /* 页面过渡动画类对象 */
    const directionObj = {
        '-1': 'jumphome',
        '0': 'jumpback',
        '1': 'jumpgo'
    }
    //设备宽度
    var deviceWidth = 0; 
    export default {
        name: 'app',
        created() {
            if(this.$utils.isIOS()) {
                this.isIOS = true;
            }            
        },
        mounted() {
            /* 动态设置html元素的字体大小,配合rem用于适配不同的手机, 设计稿为iphone6的尺寸, 基准为3.75 */
            this.$nextTick(()=> {
                this.setDocumentFontsize();

                //监听设备宽度变化，理论上在webview不存在这种情况
                window.onresize = () =>{                    
                    if(deviceWidth !== document.body.clientWidth) {                
                        this.setDocumentFontsize();
                    }
                }
            });      
        },
        data() {
            return {   
                isIOS: false
            }
        },
        methods: {
            setDocumentFontsize() {
                deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
                if (deviceWidth > 640) deviceWidth = 640;
                document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
            },
            /**动态设置路由过渡动画**/
            getJumpAnima(){                
                return directionObj[this.$store.state.jumpDirection];                              
            }
        }
    }
</script>
<style lang="less">
    @import "./common/style/common.less";
    #app {
        position: relative;
        height: 100%;
        background-color: @body-color;
    }
    // 不要放到#app中 !!!
    .bg{
        background-color: @body-color;
    }
</style>