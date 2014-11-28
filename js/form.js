var provinces = ["请选择", "江苏", "福建", "安徽"];
var cities = [["请选择"], ["南京", "苏州", "南通"], ["福州",
    "漳州", "泉州"], ["合肥", "蚌beng埠bu", "安庆"]];

$(document).ready(function () {

    /*--------ie类型检测*/
    var isIE = !!window.ActiveXObject;
    var isIE6 = isIE && !window.XMLHttpRequest;
    var isIE8 = isIE && !!document.documentMode;
    var isIE7 = isIE && !isIE6 && !isIE8;
    
    /*----------------tools function */
    var addOptions = function (select, array, isClear) {
        if (!select) return false;
        array = array || [];
        isClear = isClear || true;
        if (isClear) {
            select.innerHTML = "";
        }
        var i = 0,
            l = array.length;
        for (i; i < l; i++) {
            var option = document.createElement("option");
            option.value = array[i];
            option.innerHTML = array[i];
            select.appendChild(option);
        }
    }
    /*-------------form*/
    var form=document.getElementById('f1');
//    form.onsubmit=function(){return false;}
    
    /*----------------------select */
    var select1 = document.getElementById('s1');
    var select2 = document.getElementById('s2');
    addOptions(select1, provinces);
    select1.selectedIndex = 0;
    addOptions(select2, cities[select1.selectedIndex]);
    if (isIE7 || isIE8) {
        select1.attachEvent("onchange", function () {
            addOptions(select2, cities[select1.selectedIndex]);
        })
    } else {
        select1.addEventListener("change", function () {
            addOptions(select2, cities[select1.selectedIndex]);
        });
    }

    /*-----------------------数字键盘*/
    var keyNum = document.getElementById('keyNum');
    var input = document.getElementById('tel');
    /*闭包实现保存变量*/
    for (var i = 0; i < 10; i++) {
        var btn = document.createElement("input");
        btn.type="button";
        btn.value = i;
        btn.className="key-num";
        (function () {
            var a = i;
            if (isIE7 || isIE8) {
                btn.attachEvent("onclick", function (evt) {
                    if(input.value.length>=11) return false;
                    input.value += a;
                });
            } else {
                btn.addEventListener("click", function (evt) {
                    if(input.value.length>=11) return false;
                    input.value += a;
                });
            }
        }())
        keyNum.appendChild(btn);
    };

});