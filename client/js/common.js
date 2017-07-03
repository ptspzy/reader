$(function () {
    $.extend(window, {
        getCookie: function (name) {
            if (document.cookie.length > 0) {
                var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null) {
                    return decodeURIComponent(arr[2].trim());
                }
            }
            return null;
        },
        setCookie: function (name, value, expireSecond, domain, path) {
            var exdate = new Date();
            var temptime = exdate.getTime() + expireSecond * 1000;
            exdate.setTime(temptime);
            document.cookie = name + "=" + encodeURIComponent(value) +
                ";expires=" + exdate.toUTCString() + ";path=" + path + ";domain=" + domain + ";";
        },
        formatTime: function (T) {
            Date.prototype.format = function (format) {
                var date = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S+": this.getMilliseconds()
                };
                if (/(y+)/i.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in date) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                            date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                    }
                }
                return format;
            }
            var newDate = new Date();
            newDate.setTime(T * 1000);
            return newDate.format('yyyy-MM-dd hh:mm:ss');
        }
    });
})