export function getRedirectPath({type,avater}) {
    //根据用户信息 返回跳转地址
    //boss genius  user.type
    let url = type === 'boss' ? '/boss':'/genius'
    if(!avater){
        url+='info'
    }
    return url
}
export function getChatId(userid,targetid) {
      return [userid,targetid].sort().join("_")
}
export function formatContent(content){
    var imgArray = content.match(/\d+\.jpg/g);
    if(!imgArray){
        return content;
    };
    for(var i = 0; i < imgArray.length;i++){
        var number = imgArray[i].match(/\d+/);
        const url = require(`./arclist/${number}.gif`);
        content = content.replace(/\d+\.jpg/g,`<img src='${url}' border="0" />`);
    }
    return content;
}