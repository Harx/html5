// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {};
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
function addListener(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent || document.all) {
        element.attachEvent("on" + type, handler);
    }
}

function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            //Microsoft.XMLHttp用于win8，2000系统。
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"],
                i, len;
            for (i = 0, len = versions.length; i < l; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {

                }
            }
        }
        log(arguments.callee.activeXString);
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error(" No XHR object avaliable.");
    }
}

function log(string) {
    var log = document.getElementById("console");
    if (!log) {
        var log = document.createElement("div");
        log.id = "console";
        log.style.position = "absolute";
        log.style.top = "0px";
        log.style.right = "0px";
        log.style.width = "300px";
        log.style.height = "500px";
        log.style.boder = "1px solid black";
        log.style.background = "#dedede";
        log.style.padding = "5px";
        log.style.overflow="hidden";
        document.body.appendChild(log);
    }
    log.innerHTML += "<p>" + string + "</p>";
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
};
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