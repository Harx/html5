var provinces = ["", "江苏", "福建", "安徽"];
var cities = [[], ["南京", "苏州", "南通"], ["福州",
    "漳州", "泉州"], ["合肥", "蚌beng埠bu", "安庆"]];

$(document).ready(function () {
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

    /*----------------------select */
    var select1 = document.getElementById('s1');
    var select2 = document.getElementById('s2');
    addOptions(select1, provinces);
    select1.selectedIndex = 0;
    addOptions(select2, cities[select1.selectedIndex]);
    select1.addEventListener("change", function () {
        addOptions(select2, cities[select1.selectedIndex]);
    });


    var form = document.getElementById('f1');
    /*闭包实现保存变量*/
    for (var i = 0; i < 10; i++) {
        var btn = document.createElement("button");
        btn.innerHTML = i;

        (function () {
            var value = i;
            btn.addEventListener("click", function (evt) {
                evt.preventDefault();
                alert(value);
            });
        }())
        form.appendChild(btn);
    };

});