<template>
    <div class="hs-dealResult">
        <div class="dealResult-header">
            <span class="iconfont" :class="getStateClass()"></span>
            <p class="fund-state">{{getStateText()}}</p>
        </div>
        <div class="line-box">
            <div class="line-item" v-for="(item, index) in dataList" :key="index">
                <span class="name">{{item.name}}</span>
                <span class="value">{{item.value}}</span>
            </div>   
            <ul class="line-time" v-if="!!timeList">                
                <li class="line-time-item" v-for="(item2, index) in timeList" :key="index">
                    <span class="icon-circle"></span>
                    <span class="name">{{item2.name}}</span>
                    <span class="value">{{item2.value}}</span>
                </li>
            </ul>      
        </div>
    </div>
</template>
<script>
    export default {
        name: 'hs-dealResult',
        data() {
            return {}
        },
        methods: {
            getStateClass() {
                return this.state? 'icon-success' : 'icon-empty';
            },
            getStateText() {
                return this.state? '申请成功' : '申请失败';
            }
        },
        props: {
            /* 对象数组, 对象需要name和value属性 */
            dataList: {
                required: true,
                type: Array
            },
            /* 有小圆点和竖线的列表，对象需要name和value属性 */
            timeList: {
                required: false,
                type: Array                
            },
            state: {
                required: true,
                type: Boolean
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    .hs-dealResult {
        margin: 16px 16px 30px;
        background: #fff;
        border-radius: 6px;
        .dealResult-header {
            text-align: center;
            padding: 20px 0;
            .icon-success{
                color: @success-color;
            }
            .icon-empty{
                color: @fail-color;
            }
            .iconfont {                
                font-size: 50px;
            }
            .fund-state {
                margin-top: 12px;
                font-size: 20px;
                color: @dark-color;
            }
        }
        .line-box {            
            .line-item {
                display: flex;
                padding: 15px;                
                .border-b-1px(#e5e5e5, 15px);
                .name {
                    font-size: 16px;
                    color: @dark-color;
                    width: 120px;
                }
                .value {
                    flex: 1;
                    text-align: right;
                    font-size: 14px;
                    color: @litdark-color;
                }
            }
            .line-time{
                padding: 14px 15px 10px 0;
                margin-left: 16px;
                .line-time-item{
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 36px;                    
                    &::before{
                        content: ' ';
                        position: absolute;
                        left: 4px;
                        top: 18px;                        
                        height: 36px;
                        width: 2px;
                        background-color: #d8d8d8;                        
                    }   
                    &:last-child::before{
                        display: none;
                    }                 
                    .icon-circle{
                        width: 10px;
                        height: 10px;
                        border-radius: 100%;
                        background-color: #d8d8d8;
                        margin-right: 10px;
                    }
                    .name{
                        font-size: 14px;
                        color: #333;
                    }
                    .value{
                        flex: 1;
                        font-size: 12px;
                        text-align: right;
                        color: #666;
                    }
                }
            }
        }
    }
</style>
