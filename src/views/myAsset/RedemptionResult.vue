<template>
    <div id="redemptionResult">
        <title-bar title="申请结果" :show-back="false"></title-bar>
        <div class="content-box">
            <deal-result :state="state" :data-list="dataList" :time-list="timeList"></deal-result>
        </div>
        <div class="btn btn-primary next-button" @click="confirm" v-btntouch>确定</div>
    </div>
</template>
<script>
    export default {
        name: "redemptionResult",
        data() {
            return {
                state: true,
                dataList: [{
                        name: '基金名称',
                        value: '博时货币A'
                    },
                    {
                        name: '赎回份额',
                        value: '1000份'
                    }
                ],
                timeList: [
                    {
                        name: '收益确认',
                        value: '预计 08-21 15:00前'
                    },
                    {
                        name: '回款时间',
                        value: '预计 08-22，具体到账时间以银行为准'
                    }
                ]
            }
        },
        methods: {
            confirm() {
                APP.closeTo('/home/asset');
            }
        }
    };
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #redemptionResult {
        .page-style();        
        .next-button {
            margin: 0 16px;
        }
    }
</style>