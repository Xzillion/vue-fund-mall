<template>
    <div class="hs-list">
        <div class="list-filter-box">
            <transition name="transition-fade-in-out">
                <div class="list-filter-mask" v-if="showFilter" @click="tapFilterMask"></div>
            </transition>
            <transition name="transition-top-in">
                <div class="list-filter-content" v-if="showFilter">
                    <!-- <div class="filter-title-line">
                            <div class="fliter-title-item" v-for="(title, index) in titles" :key="index" :style="getFilterItemStyle(title)">
                                {{title.value}} <i class="triangle-up" v-if="title.canClick"></i>
                            </div>
                        </div> -->
                    <div class="filter-item" v-for="item in filterList" :key="item.key" @click="tapFilterItem(item)" :class="{selected: item.selected}">
                        <span>{{item.value}}</span>
                        <span v-show="item.selected" class="iconfont icon-selected"></span>
                    </div>
                </div>
            </transition>
        </div>
        <div class="list-title-line">
            <transition name="transition-left-in">
                <div class="title-del" v-show="delStatus">选择</div>
            </transition>
            <div class="title-line-item" v-for="(title, index) in titles" :key="index" :style="getTitleItemStyle(title)" @click="title.canClick && tapTitleItem(title)">
                {{title.value}} <i :class="getTriangleDirection()" v-if="title.canClick"></i>
            </div>
        </div>
        <div class="list-content" ref="listContent">
            <div>
                <div class="refresh-box" v-if="isSuportRefresh">
                    <load-more tip="正在刷新" v-if="refreshMore"></load-more>
                    <p class="refresh-tip" v-else>暂无更新</p>
                </div>
                <div class="list-content-line" v-for="(item, index) in data" :key="index" :style="dataLineStyle" @click="tapContentLine(item, index)" v-touch>
                    <transition name="transition-left-in">
                        <div class="del-btn iconfont icon-minus" v-show="delStatus" ></div>
                    </transition>
                    <div class="list-content-line-item" v-for="(innerItem, key) in item" :key="key" :style="getDataItemStyle(key)">
                        <p class="main-value" :style="doStyleWithColor(innerItem, key)">{{getInnerMainItem(innerItem)}}</p>
                        <p class="sub-value">{{getInnerSubitem(innerItem)}}</p>
                    </div>
                </div>
                <div class="list-loading" v-show="showLoadPan">{{loadText}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    // import _ from 'underscore'
    import { LoadMore } from 'vux'
    export default {
        name: 'hs-list',
        data() {
            return {
                refreshType: '', //refresh,loadMore
                showFilter: false,
                bScroll: null,
                count: 0
            }
        },
        created() {
            var bScrollSetting = {
                click: true,
                scrollbar: true
            };

            if (this.isSuportRefresh) {
                Object.assign(bScrollSetting, {
                    pullDownRefresh: {
                        threshold: 50,
                        stop: 50
                    }
                });
            }
            if(this.mScrollEnable) {
                Object.assign(bScrollSetting, {
                    pullUpLoad: {
                        threshold: 0
                    }
                });
            }

            this.$nextTick(() => {
                this.bScroll = new BScroll(this.$refs.listContent, bScrollSetting);                
                this.setScrollListenner();        
            });
        },
        methods: {
            //设置刷新和加载更多的监听
            setScrollListenner() {
                if (this.isSuportRefresh) {
                    this.bScroll.on('pullingDown', () => {
                        if(this.refreshMore) {
                            console.log('list--pullingDown');
                            this.refreshType = 'refresh';
                            this.$emit('refresh');                        
                        } else {
                            setTimeout(() => {
                                this.bScroll.finishPullDown();
                            }, 1000);                            
                        }                        
                    });
                }

                //上拉加载更多
                if(this.mScrollEnable) {
                    this.bScroll.on('pullingUp', () => {
                        if(this.loadMore) {
                            console.log('list--pullingUp');
                            this.refreshType = 'loadMore';
                            this.$emit('loadMoreEvent');
                        } else{
                            this.bScroll.finishPullUp();
                        }                        
                    });
                }
            },
            /* 获取过滤菜单三角的方向 */
            getTriangleDirection() {
                return this.showFilter ? 'triangle-up' : 'triangle-down';
            },
            tapFilterItem(item) {
                this.filterList.forEach(data => {
                    data.selected = false;
                });
                item.selected = true;
                //目前只支持一个过滤
                this.titles.forEach(data => {
                    if (data.canClick) {
                        data.value = item.value;
                    }
                });
                setTimeout(() => {
                    this.showFilter = false;
                }, 500);
            },
            doStyleWithColor(val, key) {
                var need = this.doRedGreen.indexOf(key) >= 0;
                if (need) {
                    return parseFloat(val) >= 0 ? {
                        color: '#ff4e50'
                    } : {
                        color: '#00981a'
                    };
                }
                return "";
            },
            getInnerMainItem(item) {
                var index = item.indexOf('\/');
                return index < 0 ? item : item.substring(0, index);
            },
            getInnerSubitem(item) {
                var index = item.indexOf('\/');
                return index < 0 ? '' : item.substring(index + 1);
            },
            tapContentLine(item, index) {
                if (this.delStatus) {
                    this.data.splice(index, 1);
                    this.$emit('deleteLine', item);
                    //ajax删除数据
                } else {
                    this.$emit('tapContentLine', item);
                }
            },
            tapFilterMask() {
                this.showFilter = false;
            },
            /* 点击标题的有三角标识 */
            tapTitleItem(item) {
                if (this.delStatus) {
                    return;
                }
                this.showFilter = true;
            },
            getFilterItemStyle(data) {
                return this.titleStyle[data.key];
            },
            getTitleItemStyle(item) {
                return this.titleStyle[item.key] ? this.titleStyle[item.key] : '';
            },
            getDataItemStyle(key) {
                return this.dataStyle[key] ? this.dataStyle[key] : '';
            }
        },
        watch: {
            data(newVal) {
                if (this.count == 0) {
                    this.count = 1;
                    return;
                }
                this.$nextTick(() => {
                    console.log('data---' + this.bScroll);
                    if (this.refreshType === 'loadMore') {
                        this.bScroll && this.bScroll.finishPullUp();
                    } else if (this.refreshType === 'refresh') {
                        this.bScroll && this.bScroll.finishPullDown();
                    }
                    // this.bScroll && this.bScroll.refresh();                                                  
                });
            },
            refreshMore(newVal) {
                !newVal && this.bScroll.finishPullDown();
            },
            loadMore(newVal) {
                !newVal && this.bScroll.finishPullUp();
            }
        },
        computed: {
            mScrollEnable() {
                return this.showLoadPan && this.loadMore;
            },
            loadText() {
                return this.loadMore ? '加载中...' : '没有更多了~';
            }
        },
        /* emit的事件有 loadMoreEvent-加载更多，tapContentLine-点击list内容的一行*/
        props: {
            /* 列表数据 [{'title的key': '显示的文本'}]，一项存在2个值的情况用‘/’连接
            如{'fundName/fundCode': '杭州证券银行/123456', perVal: '0.12467', dayRate: '+3.1213%'}               
            */
            data: {
                required: true,
                type: Array
            },
            /* 标题数据 [{key: '每一项的key', value:'显示的值'}], 一项存在2个值的情况用‘/’连接
                 如[{value: '基金名称/代码', key: 'fundName/fundCode'}, {value: '单位净值', key: 'perVal'}, {value: '日涨幅', key: 'dayRate'}]    
            */
            titles: {
                required: true,
                type: Array
                /* 在每一项支持设置canClick:true，会出现三角 */
            },
            /* 标题项样式，直接赋值给 :style */
            titleStyle: {
                required: false,
                type: Object,
                default () {
                    return {}
                }
            },
            /* 数据项样式，直接赋值给 :style */
            dataStyle: {
                required: false,
                type: Object,
                default () {
                    return {}
                }
            },
            /* 内容行样式，直接赋值给 :style */
            dataLineStyle: {
                required: false,
                type: Object,
                default () {
                    return {}
                }
            },
            /* 是否还有更多数据，true：底部展示加载中，false：没有更多了~ */
            loadMore: {
                required: false,
                type: Boolean,
                default: true
            },
            /* 是否展示底部loading面板 */
            showLoadPan: {
                required: false,
                type: Boolean,
                default: true
            },
            /* 是否可下拉刷新 */
            isSuportRefresh: {
                required: false,
                type: Boolean,
                default: false
            },
            refreshMore: {
                required: false,
                type: Boolean,
                default: true
            },
            /* 文本显示颜色是否要处理成红绿--目前有日涨幅、收益率、收益 */
            doRedGreen: {
                required: false,
                type: Array,
                default () {
                    return []
                }
            },
            /* 是否是删除状态 */
            delStatus: {
                required: false,
                type: Boolean,
                default: false
            },
            /* filter data */
            filterList: {
                required: false,
                type: Array,
                default () {
                    return [{
                        key: '1',
                        value: '近1月收益',
                        selected: true
                    }, {
                        key: '2',
                        value: '近3月收益',
                        selected: false
                    }, {
                        key: '3',
                        value: '近6月收益',
                        selected: false
                    }, {
                        key: '4',
                        value: '近1年收益',
                        selected: false
                    }, {
                        key: '5',
                        value: '所有收益',
                        selected: false
                    }]
                }
            }
        },
        components: {LoadMore},
        beforeDestroy() {
            
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";
    .common-title-item() {
        flex: 1;
        width: 100%;
        color: #666;
        font-size: 14px;
        &:last-child {
            text-align: right;
        }
    }
    .common-title-line() {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 16px;
        .border-b-1px();
    }
    .hs-list {
        display: flex;
        position: relative;
        height: 100%;
        flex-direction: column;
        background-color: #fff;
        .list-filter-box {
            .list-filter-mask {
                position: absolute;
                z-index: 99;
                top: 40px;
                right: 0;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
            }
            .list-filter-content {
                position: absolute;
                z-index: 100;
                top: 40px;
                left: 0;
                right: 0;
                background-color: #fff;
                /* .filter-title-line {
                        background-color: #fffffe;
                        .common-title-line();
                    } */
                .fliter-title-item {
                    .common-title-item();
                }
                /* .triangle-up {
                        .triangle-up();
                    } */
                .filter-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 16px 12px;
                    color: #333;
                    &.selected {
                        color: @primary-color;
                    }
                }
            }
        }
        .list-title-line {
            z-index: 101;
            .common-title-line();
            .title-del {
                width: 50px;
            }
            .title-line-item {
                .common-title-item();
            }
            .triangle-down {
                .triangle-down();
            }
            .triangle-up {
                .triangle-up();
            }
        }
        .list-content {
            position: relative;
            flex: 1;
            overflow: hidden; // -webkit-overflow-scrolling: touch;
            .refresh-box {
                position: absolute;
                top: -40px;
                left: 0;
                right: 0;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color: #999;
                text-align: center;
                z-index: -1;
                .weui-loadmore{
                    height: 40px;
                    margin: 0 auto;
                    line-height: 40px;
                }
                .refresh-tip{
                    height: 40px;
                    line-height: 40px;
                }
            }
            .list-content-line {
                padding: 12px 16px;
                display: flex;
                align-items: center;
                .border-b-1px();
                .del-btn {
                    font-size: 16px;
                    width: 50px;
                    color: red;
                }
                .list-content-line-item {
                    flex: 1;
                    width: 100%;
                    overflow: hidden;
                    color: #333;
                    font-size: 14px;
                    .main-value {
                        .word-hide();
                    }
                    .sub-value {
                        font-size: 12px;
                        color: #999;
                        .word-hide();
                    }
                    &:last-child {
                        text-align: right;
                    }
                }
            }
            .list-loading {
                text-align: center;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color: #999;
            }
        }
    }
</style>

