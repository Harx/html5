/**
 * Created by harx on 2014/12/26.
 */
var Harx=Harx||{};

// Common--------------------------------------------------------------------------------------------------
Harx.event.addListener=function(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }else{
        element["on"+type]=handler;
    }
};
Harx.event.removeListener=function(element,type,handler){
    if(element.removeEventListener){
        element.removeEventListener(type,handler,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+type,handler);
    }else{
        element["on"+type]=null;
    }
};
Harx.event.getEvent=function(event){
    return event?event:window.event;
};
Harx.event.getTarget=function(event){
    return event.target||event.scrElement;
};
Harx.event.stopPropagation=function(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble=false;
    }
};
Harx.event.preventDefault=function(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue=false;
    }
};

// MouseEvent-------------------------------------------------------------------------------------------------------
/**
 *
 * @param event
 * @returns {Number}
 */
Harx.event.mouse.pageX=function(event){
    return event.pageX || event.clientX+(document.body.scrollLeft||document.documentElement.scrollLeft);
};
/**
 *
 * @param event
 * @returns {Number}
 */
Harx.event.mouse.pageY=function(event){
    return event.pageY || (event.clientY+document.body.scrollTop||document.documentElement.scrollTop);
};
/**
 * 用于兼容IE的mouseover和mouseout。这两个事件都冒泡。
 * @param event
 * @returns {element || null}
 */
Harx.event.mouse.getRelatedTarget=function(event){
    if(event.relatedTarget){
        return event.relatedTarget;
    }else if(event.toElement){
        return event.toElement;
    }else if(event.fromElement){
        return event.fromElement;
    }else{
        return null;
    }
};
/**
 * 改变IE的返回值，映射为标准值；
 * 即左键（主鼠标键）0，中键（滚轮按钮）1，右键（次鼠标键）2；
 * @param event
 * @returns {number}
 */
Harx.event.mouse.getButton=function(event){
    if(document.implementation.hasFeature("MouseEvents","2.0")){
        return event.button;
    }else{
        switch(event.button){
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
                return 0;
            case 2:
            case 6:
                return 2;
            case 4:
                return 1;
        }
    }
};

