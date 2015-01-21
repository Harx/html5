var provinces = ["请选择", "江苏", "福建", "安徽"];
var cities = [["请选择"], ["南京", "苏州", "南通"], ["福州",
    "漳州", "泉州"], ["合肥", "蚌beng埠bu", "安庆"]];

$(document).ready(function () {

    /*--------ie类型检测*/
    var isIE = !!window.ActiveXObject;
    var isIE6 = isIE && !window.XMLHttpRequest;
    var isIE8 = isIE && !!document.documentMode;
    var isIE7 = isIE && !isIE6 && !isIE8;

    /*
     Form 1 register
     */
    (function () {
        /*------basic form validates*/
        var form = $("#f1");
        $("input", form).not(":submit").bind("blur", function () {
            if (this.validity.typeMismatch == true) {
                console.log("validity success");
                this.setCustomValidity("Type Miss Match");
            } else {
                console.log("validity fail");
                this.setCustomValidity("");
            }
        });
        /*-------------自动聚焦，ltIE8兼容*/
        if (!Modernizr.input.autofocus) {
            console.log("not support auto-focus");
            $("input[autofocus]").eq(0).trigger("focus");
        }
    })();

    /*
     Form 2 number
     */
    (function () {
        if (document.createElement("input").webkitSpeech === undefined) {
            console.log("Speech input is not supported in your browser.");
        }

        var form = $("#f2"),
            input = $(".age", form)[0],
            reset = $(".reset", form)[0],
            tip = $(".tip", form)[0],
            arr = ["猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊"];

        function getTip() {
            var number = parseInt(input.value),
                year = (new Date().getFullYear() - number),
                msg;
            if (!input.validity.valid) {
                msg = "输入有误请重新输入";
            } else {
                msg = "您出生于：" + year + "，属：" + (/^\d{4}$/.test(year) ? arr[year % 12] : "") + "。";
            }
            tip.innerHTML = msg;
        }

        function clear() {
            //TODO
            //$(input).trigger("input");//不可用为何？？

            tip.innerHTML = "";
        }

        $(input).bind("input speechchange", getTip);
        //input.bind("speechchange", getTip);
        $(reset).bind("click", clear.bind(this));

    })();

    /*
     Form 3 multiple file
     */
    (function () {
        var form = document.getElementById("f3"),
            file = document.getElementById("file"),
            fileList = document.getElementById("file-list"),
            fileListBody = fileList.getElementsByTagName("tbody")[0],
            formAction = form.getAttribute("action"),
            fileMap = {},
            GUID = 0;

        //generate id
        function guid() {
            return GUID++;
        }

        function listFile(files) {
            var  htmls = [];
            fileMap={};
            files = Array.prototype.slice.call(files, 0);
            files.forEach(function (file, index) {
                var reader,
                    _guid = guid();
                var content = '<tr><td>' +
                    file.name + '</td><td>' +
                    file.type + '</td><td>' +
                    file.size + '</td><td id="J_' +
                    _guid + '"></td><td>' +
                    '<div class="progressBar">' +
                    '<div class="progressBarValue" id="J_p_' +
                    _guid + '">' +
                    '</div></div>' +
                    '</td></tr>';
                htmls.push(content);
                if (file.type.toLowerCase().match(/image.*/)) {
                    reader = new FileReader();
                    reader.addEventListener("load", function (event) {
                        document.getElementById("J_" + _guid).innerHTML = '<img title="' + file.name + '" alt="' + file.name + '" src="' + event.target.result + '" />'
                    });
                    reader.readAsDataURL(file);
                }
                fileMap[_guid] = file;
            });
            $(fileListBody).html(htmls.join(""));
        }

        //asynchronously upload file by ajax
        function upload_file(file, id) {
            var xhr = createXHR(),
                formData = new FormData,
                eleProgress = document.getElementById("J_p_" + id);
            formData.append("file", file);

            xhr.open("post", formAction, true);
            xhr.addEventListener("load", function () {

            });
            xhr.upload.addEventListener("progress", function (event) {
                var percent;
                if (event.lengthComputable) {
                    percent = (event.loaded / event.total * 100) + "%";
                    eleProgress.style.width = percent;
                    eleProgress.innerHTML = percent;
                }
            });
            xhr.send(formData);
        }

        //register file change event
        file.addEventListener("change", function () {
            listFile(file.files);
        }, false);

        //register submit event. prevent default & asynchronously upload file
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            for (var id in fileMap) {
                if (fileMap.hasOwnProperty(id)) {
                    upload_file(fileMap[id], id);
                }
            }
        });
        fileList.addEventListener("dragenter", function (e) {
            e.preventDefault();
            this.className = "hover";
        });
        fileList.addEventListener("dragleave", function (e) {
            e.preventDefault();
            this.className = "";
        });
        fileList.addEventListener("dragover", function (e) {
            e.preventDefault();
        });
        fileList.addEventListener("drop", function (e) {
            e.preventDefault();
            this.className = "";
            listFile(e.dataTransfer.files);
        });
    })();

    /*
     Form X other
     */
    (function () {
        /* range    */
        var range = $("#range"),
            output = $(range).next("output");
        var setText = function () {
            output.text(range.val() + "%");
        };
        range.bind("change", setText);


        /*------关联的两个项目选择栏 */
        /* tools function */
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
        };
        /* main */
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

        /* ----------数字键盘*/
        var keyNum = document.getElementById('keyNum');
        var input = document.getElementById('tel');
        /*闭包实现保存变量*/
        for (var i = 0; i < 10; i++) {
            var btn = document.createElement("input");
            btn.type = "button";
            btn.value = i;
            btn.className = "key-num";
            (function () {
                var a = i;
                if (isIE7 || isIE8) {
                    btn.attachEvent("onclick", function (evt) {
                        if (input.value.length >= 11) return false;
                        input.value += a;
                    });
                } else {
                    btn.addEventListener("click", function (evt) {
                        if (input.value.length >= 11) return false;
                        input.value += a;
                    });
                }
            }());
            keyNum.appendChild(btn);
        }
    })();
});