// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*----------------------------兼容性*/
var addListener = function (element, type, handler) {
    if (element.addEventListener) {
        addListener = function (element, type, handler) {
            element.addEventListener(type, handler, false);
        }
    } else if (element.attachEvent || document.all) {
        addListener = function (element, type, handler) {
            element.attachEvent("on" + type, handler);
        }
    }
    addListener(element, type, handler);
};

var createXHR = function () {
    if (typeof XMLHttpRequest != "undefined") {
        createXHR = function () {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject != "undefined") {
        var versions = [
                //function () {
                //    return new ActiveXObject("MSXML2.XMLHTTP.6.0");//IE6下创建成功，但是无法使用。
                //},
                function () {
                    return new ActiveXObject("MSXML2.XMLHttp");
                },
                function () {
                    return new ActiveXObject("Microsoft.XMLHttp");
                }
            ],
            i, len;
        for (i = 0, len = versions.length; i < len; i++) {
            try {
                versions[i]();
                createXHR = versions[i];
                break;
            } catch (ex) {
            }
        }
    } else {
        throw new Error(" No XHR object avaliable.");
    }
    return createXHR();
};

var logNum = 0;

function log(string) {
    var log = document.getElementById("console");
    if (!log) {
        log = document.createElement("div");
        log.id = "console";
        //log.style.cssText = "position:fixed;top:0px;right:0px;bottom:0px;width:300px;border:1px solid black;background:#dedede;padding:5px;";
        log.style.position = "fixed";
        log.style.top = "0px";
        log.style.right = "0px";
        log.style.width = "300px";
        log.style.height = "500px";
        log.style.border = "1px solid black";
        log.style.background = "#dedede";
        log.style.padding = "5px";
        log.style.overflow = "hidden";
        document.body.appendChild(log);
    }
    log.innerHTML += "<p>No." + (++logNum) + ":" + string + "</p>";
}
/* 动画类--------------------------------------------*/
/* 构造函数*/
function Animate(config) {
    this.target = config.target;
    this.attribute = config.attribute;
    this.startValue = config.startValue;
    this.endValue = config.endValue;
    this.effect = config.effect || "sin";
    this.duration = config.duration || 300;
    this.fps = config.fps || 60;
    this.interval = 1000 / this.fps;

    this.run();
}
/* 原型*/
Animate.prototype = {
    run: function () {
        var startTime = new Date();
        var self = this;
        var timer = setInterval(function () {
            var curTime = new Date();
            var percent = (curTime - startTime) / self.duration;
            if (percent > 1) {
                self.target.style[self.attribute] = self.endValue + "px";
                clearInterval(timer);
            } else {
                percent = Animate.effect[self.effect](percent);
                self.target.style[self.attribute] = self.startValue + ((self.endValue - self.startValue) * percent) + "px";
            }
        }, this.interval);
    }
};
/* 类方法*/
Animate.effect = {
    line: function (p) {
        return p;
    },
    sin: function (percent) {
        return Math.sin(Math.PI * 0.5 * percent);
    }
};