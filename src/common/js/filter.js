/**
 * created by zouxiang on 2017.10.9
 * 全局vue过滤器
 */
import Vue from 'vue'

/**
 * 格式化手机号
 */
Vue.filter('formatMobile', function (value) {
    if (!!value == false) {
        return '';
    }
    return value.substring(0, 3) + '****' + value.substring(7, 11);
});
/**
 * 格式化邮箱
 */
Vue.filter('formatEmail', function (email) {
    if (!!email == false) {
        return "";
    }
    var emailStr = "";
    var first = email.indexOf('@');
    if (first >= 6) {
        emailStr = email.substring(0, first - 4) + "****" + email.substring(first, email.length);
    } else {
        emailStr = email.substring(0, first - 2) + "**" + email.substring(first, email.length);
    }
    return emailStr;
});
/**
 * 格式化银行卡
 * @param last4 String
 * @return **** + 最后4位
 * 
 * 默认返回3组**** + 最后4位
 */ 
Vue.filter('formatCardNum', function (card, last4) {
    var len = card.length;
    var card4last = card.substring(len -4);
    if (last4 == 'last4') {
        return '****' + card4last;
    }
    return "****  **** **** " + card4last;
});

/**
 * 格式化身份证号码
 */
Vue.filter('formatIDCard', function (IDCard) {
    if (!IDCard) {
        return IDCard;
    }
    var a = IDCard.substring(0, 6);
    var b = IDCard.substring(IDCard.length-4);
    return a + '********' + b;
});

/**
 * 格式化金钱
 */
Vue.filter('formatMoney', function (s) {
    if(!!s == false) {
        return "";
    }
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
});

/**
 * 倒计时mm:ss
 * @param s: 秒
 */
Vue.filter('formatCountDown', function (s) {
    var minute = parseInt(s/60);    
    var second = s % 60;
    var realMinute = minute > 9 ? minute : '0'+minute;
    var realSecond = second > 9 ? second : '0'+second;
    return realMinute + ' : ' + realSecond;
});

/**
 * 格式化日期 年-月-日
 */
Vue.filter('formatDate', function (data) {
    var year = data.substring(0, 4);
    var month = data.substring(4, 6);
    var date = data.substring(6, 8);
    return year + '-' + month + '-' + date;
});