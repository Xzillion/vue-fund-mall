/**
 * created by zouxiang on 2017.10.9
 * 全局vue指令
 */
import Vue from 'vue'

/*输入框自动获得焦点*/
Vue.directive('focus', {
    inserted(el) {
        setTimeout(() => {
            el.focus();
        }, 500);        
    }
});

/* 普通点击效果,支持传递点击后的背景色,传递none则无效 */
Vue.directive('touch', {
    inserted(el, binding) {
        if (binding.value === 'none') {
            return
        }
        // var currentColor = el.style.backgroundColor;        
        var activeColor = binding.value || '#FFF8DC';

        el.addEventListener("touchstart", function () {
            el.style.backgroundColor = activeColor;            
        }, false);
        el.addEventListener("touchend", function () {            
            el.style.backgroundColor = '';           
        }, false);
        el.addEventListener("touchmove", function () {
            el.style.backgroundColor = '';
        }, false);
        el.addEventListener("touchcancel", function () { 
            el.style.backgroundColor = '';
        }, false);
    }
});

/* 按钮点击效果 */
Vue.directive('btntouch', {
    inserted(el) {
        var view = el;
        view.addEventListener("touchstart", function () {
            $(view).addClass("btn-touch-on");
        }, false);
        view.addEventListener("touchend", function () {
            $(view).removeClass("btn-touch-on");
        }, false);
        view.addEventListener("touchmove", function () {
            $(view).removeClass("btn-touch-on");
        }, false);
        view.addEventListener("touchcancel", function () {
            $(view).removeClass("btn-touch-on");
        }, false);
    }
});

/**
 * %字体大小比前面的数字小
 * val ： 值（必传）
 * fontSize：小数点后字体大小，默认14px （可选）
 * 
 * 例如
 * v-percent="{val: 0.0431, fontSize: '14px'}"
 */ 
Vue.directive('percent', function (el, binding) {
    var val = binding.value.val;
    if (!val) {
        $(el).html(val);
        return;
    }
    var newVal = (parseFloat(val) * 100).toFixed(2);
    var fontSize = binding.value.fontSize ? binding.value.fontSize : '14px';
    $(el).html(`${newVal}<span style='font-size:${fontSize}'>%<span>`);
});

/**
 * 小数点后两位字体小
 * val ： 值（必传）
 * fontSize：小数点后字体大小，默认12px （可选）
 * 
 * 例如
 * v-fixed2small="{val: 1642.12, fontSize: '14px'}"
 */ 
Vue.directive('fixed2small', function (el, binding) {    
    var val = binding.value.val, t = "";
    if (!val) {
        $(el).html(val);
        return;
    }
    val = parseFloat((val + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    var l = val.split(".")[0].split("").reverse(),
        r = val.split(".")[1];

    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var intVal = t.split("").reverse().join("");

    var fontSize = binding.value.fontSize ? binding.value.fontSize : '12px';
    $(el).html(`${intVal}.<span style="font-size:${fontSize}">${r}</span>`);
});

/**
 * 收益金额,增长红色，下降绿色
 * val ： 值（必传）
 * 
 * 例如
 * v-updownwithcolor="{val: 12.45552}"
 */
Vue.directive('updownwithcolor', function (el, binding) {
    var val = binding.value.val, t = "";
    if (!val) {
        $(el).html(val);
        return;
    }
    
    val = parseFloat((val + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    var l = val.split(".")[0].split("").reverse(),
        r = val.split(".")[1];

    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var intVal = t.split("").reverse().join("");
    
    var intValStr = parseInt(intVal) < 0 ? intVal : '+' + intVal;
    var color = parseInt(intVal) < 0 ? '#00981a' : '#ff4e50';

    $(el).html(`<span style="color: ${color}">${intValStr}.${r}</span>`);
});


/**
 * 收益率,增长红色有+，下降绿色有-
 * val ： 值（必传）
 * fontSize：%字体大小，默认12px （可选）
 * 
 * 例如
 * v-rateofpercent="{val: 0.0342, fontSize: '14px'}"
 */
Vue.directive('rateofpercent', function (el, binding) {
    var val = binding.value.val;
    if (!val) {
        $(el).html(val);
        return;
    }
    var fontSize = binding.value.fontSize ? binding.value.fontSize : '12px';
    var newValStr = (parseFloat(val) * 100).toFixed(2);
    var newVal = parseFloat(newValStr);
    var color = newVal < 0 ? '#00981a' : '#ff4e50';
    var valStr = newVal < 0 ? newValStr : '+' + newValStr;
    $(el).html(
        `<span style="color: ${color}">
            ${valStr}<span style='font-size:${fontSize}'>%<span>        
        </span>`
    );
});