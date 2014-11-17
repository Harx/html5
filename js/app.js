//------------Tool functions----------------
String.prototype.capitalize=function(){
    if(this==="") return this;
    return this.charAt(0).toUpperCase()+this.slice(1);
}


//--------------List data---------------
var arrItems = [
    "float",
    "nav",
    "slideshow",
    'slidesJs'
        ]
//------------- add <a> to #list---------
var list = document.getElementById('list');
var i = 0,
    l = arrItems.length;
for (i; i < l; i++) {
    var id = arrItems[i];
    var a = document.createElement("a");
    a.href = "template/" + id + ".html";
    a.innerHTML =id.capitalize();
    list.appendChild(a);
}


