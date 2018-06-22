<template>
    <div class="hs-actionSheet">        
        <transition name="transition-fade-in-out">
            <div class="mask" @click="tapItem(-1)" v-show="isShow"></div>
        </transition>        
        <transition name="transition-up-down">
            <div class="content-box" v-show="isShow">
                <div class="title">{{title}}</div>
                <div class="item" :style="{color: item.color}" v-for="(item, index) in actionList" @click="tapItem(item)" :key="index">{{item.value}}</div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'hs-actionSheet',
    data() {
       return {           
       }
    },   
    methods: {
        tapItem(item) {            
            this.$emit('tapIndex', item);            
        }
    },
    props: {
        /* 是否显示 */
        isShow: {
            type: Boolean,
            default: false
        },
        /* 标题名 */
        title: {
            type: String,
            required: true,
            default: '提示'
        },
        /* 操作列表名称 ,对象数组,默认展示删除、取消*/
        actionList: {
            type: Array,
            required: false,
            default() {
                return [{key: 'delete', value: '删除', color: '#ff4e50'}, {key: 'cancel', value: '取消', color: '#2a8ecc'}];
            }
        }
    }
}
</script>
<style lang="less">
    .hs-actionSheet{
        text-align: center;
        /* 底部1px线条 */
        .border-b-1px(@color: #e5e5e5) {
            position: relative;
            &::after {
                display: block;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                content: ' ';
                height: 1px;
                border-bottom: 1px solid @color;
                -webkit-transform-origin: 0 100%;
                transform-origin: 0 100%;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
        }
        .mask{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 999;
            background: rgba(0, 0, 0, 0.4);
        }
        .content-box{
            position: fixed;
            z-index: 9999;            
            bottom: 0;
            left: 0;      
            right: 0;     
            background-color: #fff;    
            .title{
                font-size: 13px;
                color: #666;
                padding: 16px 10px;
                .border-b-1px();
            }   
            .item{
                font-size: 20px;
                padding: 14px 10px;
                .border-b-1px();
            }     
        }
    }
</style>