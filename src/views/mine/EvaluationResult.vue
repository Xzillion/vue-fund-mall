<template>
    <div id="evaluationResult">
        <title-bar title="测评结果" back-path="/home/mine"></title-bar>
        <div class="main-column-box">
            <div v-if="isEvaluated">
                <div class="content-box">
                    <div class="top-content">
                        <risk-gauge :paper-score="paperScore" :risk-level="riskLevel" :animated="false" class="chart-pan"></risk-gauge>
                        <!-- <div class="chart-pan" ref="chart"></div> -->
                        <p class="text-center">有效期：2018-10-24</p>
                    </div>                    
                    <div class="info-pan">
                        <p class="text">
                            您的风险测评结果为:积极型。<br> 可以投资低风险、偏低风险、中风险、偏高风险的产品。请您根据自身承受能力进行审慎决策。
                        </p>
                    </div>
                </div>
                <div class="btn-box">
                    <div class="btn btn-primary" @click="confirm" v-btntouch>确定</div>
                    <div class="btn btn-redo" @click="evaluate">重新测评</div>
                </div>
            </div>
            <div v-if="!isEvaluated">
                <div class="content-box">
                    <div class="top-content">
                        <risk-gauge :paper-score="paperScore" :risk-level="riskLevel" class="chart-pan"></risk-gauge>
                        <!-- <div class="chart-pan" ref="noneChart"></div> -->
                    </div>
                    <p class="undo-text">您尚未进行风险测评，请先测评！</p>
                </div>
                <div class="btn btn-primary btn-do" @click="evaluate" v-btntouch>进行测评</div>
            </div>
        </div>
    </div>
</template>
<script>
    import RiskGauge from 'src/components/RiskGauge/Default.vue'
    // var echarts = require('echarts/lib/echarts');
    // require('echarts/lib/chart/gauge');
    /* var optionObj = {
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [{
            name: '业务指标',
            type: 'gauge',
            data: [{
                value: 0,
                name: '分数'
            }]
        }]
    }; */
    export default {
        name: 'evaluationResult',
        mounted() {
            this.$nextTick(() => {
                // var chart = this.isEvaluated ? this.$refs.chart : this.$refs.noneChart;
                setTimeout(() => {
                    this.paperScore = 70;
                    this.riskLevel = '激进型';
                }, 200);
                /* if (this.isEvaluated) {
                    optionObj.series[0].data[0].value = 60;
                }
                var myChart = echarts.init(chart);
                setTimeout(() => {                    
                    myChart.setOption(optionObj);
                }, 300); */
            });
        },
        data() {
            return {
                paperScore: 0,
                riskLevel: '',
                isEvaluated: true
            }
        },
        methods: {
            confirm() {
            },
            evaluate() {
                APP.openWin('/riskEvaluation')
            }
        },
        components: {
            RiskGauge
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    #evaluationResult {
        .page-style();
        .content-box {
            margin: 15px 15px 30px;            
            .top-content{
                background-color: #fff;
                border-radius: 8px;
            }
            .undo-text {
                padding: 18px;
                margin-bottom: 26px;
                text-align: center;
                color: @gray-color;
                font-size: 14px;
                border-top: 1px dashed #f3f4f8;
                background-color: #fff;
                border-radius: 8px;
            }
            .text-center {
                text-align: center;
                font-size: 18px;
                color: @litdark-color;
                padding-bottom: 28px;
                border-bottom: 1px dashed #f3f4f8;
            }
            .chart-pan {
                height: 280px;
                width: 100%;                
            }
            .info-pan {
                background-color: #fff;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 26px;
                .text {
                    color: @gray-color;
                    font-size: 14px;
                }
            }
        }
        .btn-box {
            margin: 0 15px 10px;
            .btn-redo {
                margin-top: 16px;
                color: @primary-color;
                border: 1px solid @primary-color;
            }
        }
        .btn-do {
            margin: 0 15px;
        }
    }
</style>

