/**
 * vue事件总线插件 by zouxiang
 */

export default {
    install: function (Vue) {
        var Bus = new Vue({
            methods: {                
                emit(event, ...params) {
                    this.$emit(event, ...params);
                },
                on(event, callback = function () {}) {
                    this.$on(event, callback);
                },
                off(event, callback = function () {}) {
                    this.$off(event, callback);
                }
            }
        });

        Vue.prototype.$bus = Bus;
    }
}

/* =====实例====== */
// this.$bus.emit('testBus', 'aaa', 'bbb');  
// this.$bus.on('testBus', function (a, b) {
//     console.log(a, b); //aaa, bbb
//     
// });
