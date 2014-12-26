//------------Tool functions----------------
String.prototype.capitalize = function () {
    if (this === "") return this;
    return this.charAt(0).toUpperCase() + this.slice(1);
}


//--------------List data---------------
var arrItems = [
    "test",
    "lagou",
    "float",
    "nav", //https://support.mozilla.org/zh-CN/?icn=tabz
    'form',
    'table',
    'sortTable',
    "slideshow",
    'slidesJs',
    'center',
    'jumbotron' //http://www.imooc.com/activity/zhaopin
        ]
    //------------- add <a> to #list---------
var date1=new Date;
var i = 0,
    l = arrItems.length,
    fragment = document.createDocumentFragment();
for (i; i < l; i++) {
    var id = arrItems[i];
    var a = document.createElement("a");
    a.href = "template/" + id + ".html";
    a.innerHTML = id.capitalize();
    fragment.appendChild(a);
}
var list = document.getElementById('list');
list.appendChild(fragment);
var date2=new Date;
console.log("cost time:"+(date2-date1));