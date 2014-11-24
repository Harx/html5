window.onload = function () {
    var caption = document.getElementsByTagName('caption')[0];
    var thead = document.getElementsByTagName('thead')[0];
    var tbody = document.getElementsByTagName('tbody')[0];
    calender(caption, thead, tbody);
}

function calender(caption, thead, tbody) {
    //设置星期几在第一
    var order = [0, 1, 2, 3, 4, 5, 6];
    var weeks = ['Sun', 'Mon', 'Feb', 'Mar', 'Apr', 'May', 'Sat'];
    //每月天数
    var dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var date = new Date();
    var year = date.getFullYear(),
        month = date.getMonth(),
        today = date.getDate(),
        format = date.toLocaleDateString();
    //该月第一天星期几
    date.setDate(1);
    var day = date.getDay();
    //所有日历数据
    var days = [];
    //上个月的空白
    var startBlank = order.indexOf(day);
    var i;
    for (i = 0; i < startBlank; i++) {
        days.push("");
    }
    //日期数据
    for (i = 0; i < dayOfMonth[month]; i++) {
        days.push(i + 1);
    }
    //下个月的空白
    var endBlank = 0;
    var outerCycle = 0; //日历行数
    var l = days.length;
    if (l > 5 * 7) {
        outerCycle = 6;
        endBlank = 6 * 7 - l;
    } else if (l > 4 * 7) {
        outerCycle = 5;
        endBlank = 5 * 7 - l;
    }
    for (i = 0; i < endBlank; i++) {
        days.push("");
    }
    //输出内容
    caption.innerHTML = format;

    var html = [];
    for (i = 0; i < 7; i++) {
        html.push('<th>')
        html.push(weeks[order[i]]);
        html.push('</th>')
    }

    thead.innerHTML = html.join("");
    var j, html = [];
    for (i = 0; i < outerCycle; i++) {
        html.push('<tr>');
        for (j = 0; j < 7; j++) {
            var index = i * 7 + j;
            if ((today - 1 + startBlank) == index) {
                html.push('<td class="today">');
            } else {
                html.push('<td>');
            }
            html.push(days[index]);
            html.push('</td>');
        }
        html.push('</tr>');
    }
    tbody.innerHTML = html.join("");
}