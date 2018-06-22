<template>
    <div class="hs-canvas">
        <canvas id="risk-gauge"></canvas>
    </div>
</template>
<script>
    var interval = null;
    var scaleObj = {};
    const BASE_RADIUS = 160; //半径基数
    const RADIUS = 280; // 半径
    const RADIUS_MULTIPLE = RADIUS / BASE_RADIUS; // 半径的缩放倍数
    const GAUGE_OPTIONS = {
        min: 0, //最大值
        max: 100, // 最小值
        splitNumber: 100, //切分刻度
        angle: Math.PI * 5 / 4, // 弧度
        startAngle: Math.PI * 7 / 8, // 开始弧度
        lineSpace: 10 * RADIUS_MULTIPLE, //弧线间距
        shadowLine: { // 手机端阴影轴线
            radius: RADIUS, //半径
            width: 1 * RADIUS_MULTIPLE, //宽度
            color: 'rgba(0, 0, 0, .3)',
        },
        progressLine: { //进度轴线
            width: 2 * RADIUS_MULTIPLE, //宽度
            color: 'rgba(155, 155, 155, .4)',
            indicator: { //指示器
                color: '#ff4e50',
                radius: 6 * RADIUS_MULTIPLE //指示球半径
            }
        },
        axisLine: { // 坐标轴线
            width: 10 * RADIUS_MULTIPLE, //宽度
            color: [
                [1, 'rgba(155, 155, 155, .4)']
            ]
        },
        splitLine: { // 刻度分隔线
            length: 10 * RADIUS_MULTIPLE, // 属性length控制线长
            color: '#888',
            drawLine: function(v, arr) { //是否绘制分隔线
                for (var id in arr) {
                    if (v == arr[id]) {
                        return true;
                    }
                }
            }
        },
        detail: { //刻度详情
            font: 12 * RADIUS_MULTIPLE + 'px 微软雅黑',
            color: 'rgba(155, 155, 155, .5)',
            formatter: function(v, scaleObj) { // 只有存在的刻度才能配置文字
                var str = v + "";
                return scaleObj[str] || '';
            }
        },
        dataStyle: { //需要展示的数据样式
            color: '#ff4e50',
            font: [62 * RADIUS_MULTIPLE + 'px 微软雅黑', 24 * RADIUS_MULTIPLE + 'px 微软雅黑'],
            marginTop: 27 * RADIUS_MULTIPLE
        },
        data: { //需要展示的数据
            value: 0,
            name: ''
        }
    }
    export default {
        name: 'hs-canvas',
        data() {
            return {
                shadowLineRadius: 0,
                progressLineRadius: 0,
                axisLineRadius: 0,
                point: {}
            }
        },
        props: {
            animated: {
                type: Boolean,
                require: false,
                default: true
            },
            paperScore: {
                type: Number,
                require: false,
                default: 0
            },
            riskLevel: {
                type: String,
                require: false,
                default: ''
            },
            scoreList: {
                type: Array,
                require: false,
                default () {
                    return [{
                            corp_risk_level_name: "保守型",
                            min_value: 0,
                            max_value: 19
                        },
                        {
                            corp_risk_level_name: "谨慎型",
                            min_value: 20,
                            max_value: 36
                        },
                        {
                            corp_risk_level_name: "稳健型",
                            min_value: 37,
                            max_value: 53
                        },
                        {
                            corp_risk_level_name: "积极型",
                            min_value: 54,
                            max_value: 82
                        },
                        {
                            corp_risk_level_name: "激进型",
                            min_value: 83,
                            max_value: 100
                        }
                    ]
                }
            }
        },
        computed: {
            lineList() {
                var list = [];
                this.scoreList.forEach(item => {
                    if (parseInt(item.max_value) < 100) {
                        list.push(item.max_value);
                    }
                });
                return list;
            }
            /* ,
                    scaleObj() {
                        var obj = {'0': '0'};
                        this.scoreList.forEach( item => {
                            var average = parseInt((item.min_value + item.max_value)/2);
                            obj[item.max_value] = item.max_value;
                            obj[average] = item.corp_risk_level_name;
                        });
                        return obj;
                    } */
        },
        watch: {
            paperScore() {
                this.draw();
            }
        },
        mounted() {
            this.$nextTick(() => {
                var gaugeMap = document.getElementById("risk-gauge");
                gaugeMap.style.width = GAUGE_OPTIONS.shadowLine.radius + 'px'
                var ctx = gaugeMap.getContext('2d');
                gaugeMap.width = (GAUGE_OPTIONS.shadowLine.radius + GAUGE_OPTIONS.shadowLine.width * 2) * 2;
                gaugeMap.height = gaugeMap.width;
                this.shadowLineRadius = GAUGE_OPTIONS.shadowLine.radius + GAUGE_OPTIONS.shadowLine.width / 2; //阴影弧线半径
                this.progressLineRadius = GAUGE_OPTIONS.shadowLine.radius - GAUGE_OPTIONS.progressLine.width / 2 - GAUGE_OPTIONS.lineSpace; //进度指示条半径
                this.axisLineRadius = this.progressLineRadius - GAUGE_OPTIONS.axisLine.width / 2 - GAUGE_OPTIONS.lineSpace; // 坐标弧线半径
                this.point = { // 圆心
                    x: gaugeMap.width / 2,
                    y: gaugeMap.height / 1.6
                }
                ctx.textBaseline = 'middle'; //文字布局
                ctx.textAlign = 'center';
                this.draw();
            });
        },
        methods: {
            draw() {
                var gaugeMap = document.getElementById("risk-gauge");
                var ctx = gaugeMap.getContext('2d');
                var num = 0;
                interval = setInterval(() => {
                    if (num <= this.paperScore) {
                        ctx.save()
                        this.drawCircle(num, gaugeMap, ctx)
                        ctx.restore()
                        num++
                    } else {
                        clearInterval(interval)
                    }
                }, 1000/60)
            },
            scaleObj() {
                var obj = {
                    '0': '0'
                };
                this.scoreList.forEach(item => {
                    var average = parseInt((item.min_value + item.max_value) / 2);
                    obj[item.max_value] = item.max_value;
                    obj[average] = item.corp_risk_level_name;
                });
                return obj;
            },
            drawCircle(value, gaugeMap, ctx) {
                GAUGE_OPTIONS.data.value = value;
                ctx.clearRect(0, 0, gaugeMap.width, gaugeMap.height) //清除画板
                ctx.translate(this.point.x, this.point.y) //移动canvas中心至圆心
                //绘制外围阴影弧线
                /* ctx.save()
                ctx.lineWidth = GAUGE_OPTIONS.shadowLine.width
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.shadowColor = GAUGE_OPTIONS.shadowLine.color
                ctx.beginPath()
                ctx.strokeStyle = GAUGE_OPTIONS.shadowLine.color
                ctx.arc(0, 0, this.shadowLineRadius, GAUGE_OPTIONS.startAngle, GAUGE_OPTIONS.startAngle + GAUGE_OPTIONS.angle)
                ctx.stroke()
                ctx.closePath()
                ctx.restore() */
                // 绘制进度指示条
                ctx.lineWidth = GAUGE_OPTIONS.progressLine.width
                //绘制底色
                ctx.beginPath()
                ctx.strokeStyle = GAUGE_OPTIONS.progressLine.color;
                ctx.arc(0, 0, this.progressLineRadius, GAUGE_OPTIONS.startAngle, GAUGE_OPTIONS.startAngle + GAUGE_OPTIONS.angle)
                ctx.stroke()
                ctx.closePath()
                //绘制指示色
                ctx.beginPath()
                ctx.strokeStyle = GAUGE_OPTIONS.progressLine.indicator.color;
                ctx.arc(0, 0, this.progressLineRadius, GAUGE_OPTIONS.startAngle, GAUGE_OPTIONS.startAngle + GAUGE_OPTIONS.angle * (GAUGE_OPTIONS.data.value / GAUGE_OPTIONS.max))
                ctx.stroke()
                ctx.closePath()
                // 绘制指示球
                ctx.save()
                ctx.rotate(GAUGE_OPTIONS.startAngle + GAUGE_OPTIONS.angle * (GAUGE_OPTIONS.data.value / GAUGE_OPTIONS.max)) //根据圆盘刻度旋转canvas
                ctx.lineWidth = 2 * RADIUS_MULTIPLE
                ctx.strokeStyle = GAUGE_OPTIONS.progressLine.indicator.color
                ctx.beginPath()
                ctx.arc(this.progressLineRadius, 0, 1, 0, Math.PI * 2)
                ctx.stroke()
                ctx.closePath()
                for (var i = 0; i <= GAUGE_OPTIONS.progressLine.indicator.radius; i++) { //绘制指示球光圈
                    ctx.globalAlpha = 1 - i * .1;
                    ctx.beginPath()
                    ctx.arc(this.progressLineRadius, 0, i, 0, Math.PI * 2)
                    ctx.stroke()
                    ctx.closePath()
                }
                ctx.restore()
                // 绘制坐标轴线
                var startAngle = 0,
                    endAngle = 0;
                ctx.lineWidth = GAUGE_OPTIONS.axisLine.width;
                GAUGE_OPTIONS.axisLine.color.forEach((item, index) => {
                    ctx.beginPath()
                    ctx.strokeStyle = item[1];
                    if (index == 0) {
                        startAngle = GAUGE_OPTIONS.startAngle;
                    } else {
                        startAngle = endAngle;
                    }
                    endAngle = item[0] * GAUGE_OPTIONS.angle + GAUGE_OPTIONS.startAngle;
                    ctx.arc(0, 0, this.axisLineRadius, startAngle, endAngle)
                    ctx.stroke()
                    ctx.closePath()
                })
                // 绘制文字
                for (var i = 0; i <= GAUGE_OPTIONS.splitNumber; i++) {
                    ctx.fillStyle = GAUGE_OPTIONS.detail.color
                    ctx.lineWidth = 1;
                    ctx.font = GAUGE_OPTIONS.detail.font
                    var labelText = '';
                    if (i == 0)
                        labelText = GAUGE_OPTIONS.detail.formatter(GAUGE_OPTIONS.min, this.scaleObj());
                    else {
                        labelText = GAUGE_OPTIONS.detail.formatter(GAUGE_OPTIONS.max / GAUGE_OPTIONS.splitNumber * i, this.scaleObj());
                    }
                    ctx.save() //保存状态
                    ctx.rotate(GAUGE_OPTIONS.startAngle + GAUGE_OPTIONS.angle / GAUGE_OPTIONS.splitNumber * i) //根据圆盘刻度旋转canvas
                    // 绘制分隔线
                    if (GAUGE_OPTIONS.splitLine.drawLine(i, this.lineList)) {
                        ctx.save()
                        ctx.strokeStyle = GAUGE_OPTIONS.splitLine.color
                        ctx.beginPath()
                        ctx.moveTo(this.axisLineRadius + GAUGE_OPTIONS.axisLine.width / 2, 0)
                        ctx.lineTo(this.axisLineRadius + GAUGE_OPTIONS.axisLine.width / 2 - GAUGE_OPTIONS.splitLine.length, 0)
                        ctx.closePath();
                        ctx.stroke();
                        ctx.restore()
                    }
                    ctx.save() //保存状态
                    ctx.translate(this.axisLineRadius - GAUGE_OPTIONS.axisLine.width, 0) //将canvas中心移动至圆盘刻度
                    ctx.rotate(Math.PI * 1 / 2) //旋转canvas,使得文字绘制点与圆盘弧度相切
                    ctx.fillText(labelText, 0, GAUGE_OPTIONS.lineSpace) //绘制文字
                    ctx.restore() //恢复状态
                    ctx.restore() //恢复状态
                }
                //绘制最终展示的数据
                ctx.save() //保存状态
                ctx.fillStyle = GAUGE_OPTIONS.dataStyle.color
                ctx.font = GAUGE_OPTIONS.dataStyle.font[0]
                ctx.fillText(GAUGE_OPTIONS.data.value.toString(), 0, -GAUGE_OPTIONS.dataStyle.marginTop)
                ctx.font = GAUGE_OPTIONS.dataStyle.font[1]
                ctx.fillText(this.riskLevel, 0, GAUGE_OPTIONS.dataStyle.marginTop)
                ctx.fillStyle = 'rgba(155, 155, 155, .5)'
                ctx.font = '24px 微软雅黑'
                ctx.fillText('GRADE', 0, -110)
                ctx.restore() //恢复状态
            }
        },
        beforeDestory() {
            clearInterval(interval);
        }
    }
</script>
<style lang="less">
    .hs-canvas {
        height: 100%;
        canvas {
            display: block;
            height: 100%;
            margin: 0 auto;
        }
    }
</style>
