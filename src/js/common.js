//定义表情符
export const lookUrl = "http://live.ofweek.com/static/web/wap/live/assets/"
export const look = ['调皮','憨笑','呲牙','偷笑','大兵','色','惊恐','疑问','晕','惊讶','再见','玫瑰','抱拳','握手','OK','强','胜利','咖啡']
//export const look = ["smile", "biggrin", "lol", "titter", "db", "se", "jk", "yiw", "yun", "shocked", "zj", "mg", "bq", "handshake", "hd", "qiang", "victory", "kf"]
//表情过滤正则
export const rex = /\[(.+?)\]/g

//表情地址
export const lookStr = {
	'[调皮]':'smile',
	'[憨笑]':'biggrin',
	'[呲牙]':'lol',
	'[偷笑]':'titter',
	'[大兵]':'db',
	'[色]':'se',
	'[惊恐]':'jk',
	'[疑问]':'yiw',
	'[晕]':'yun',
	'[惊讶]':'shocked',
	'[再见]':'zj',
	'[玫瑰]':'mg',
	'[抱拳]':'bq',
	'[握手]':'handshake',
	'[OK]':'hd',
	'[强]':'qiang',
	'[胜利]':'victory',
	'[咖啡]':'kf'
}

// 获取时间戳
export function newDate(){
	return new Date().getTime()
}

//未登录弹窗开启
export function noLogin(){
	showLogin();

}

//公告滚动
export function scrollLeft(warp, content, delay) {
    var div = document.getElementById(warp),
        ul = document.getElementById(content),
        _divWidth = div.offsetWidth,  //外层宽度
        _ulWidth = ul.offsetWidth,  //内层宽度
        t = parseInt(_ulWidth/delay); //一次滚动的时间
    //不满足滚动条件
    if( _divWidth > _ulWidth ) {
        return false;
    }

    //设置动画属性
    ul.style.transform = 'translate(' + -_ulWidth + 'px, 0)';
    ul.style.transition = 'transform ' + t + 's linear';

   setTimeout(function() {
        //重置动画属性
        ul.style.transform = 'translate(' + _divWidth + 'px, 0)';
        ul.style.transition = '';
        scrollLeft(warp, content, delay);
    }, t*1000);
}




//表情过滤
export function biaoQing(val){
    if (typeof val === 'string') {
        val = val.replace(rex,function(d){
            return '<img src="http://live.ofweek.com/static/web/wap/live/assets/'+lookStr[d]+'.gif" >'
        })
    }
    return val
}


//得到加密的姓名
export function getUserName(str){
    var begin=str.substring(0,1);
    var end=str.substring(str.length-1);
    var xin=""

    if(str.length==1){
        return str;
    }
    if(str.length==2){
        return begin+"*";
    }
    
    for(var i=0;i<str.length-2;i++){
        xin+="*";
    }
    return begin+xin+end;        
}


//聊天内容按时间排序
export function chatSort(array) {
    return array.sort(function(a, b) {
        return a.chatTime - b.chatTime;
    });
}



//根据userId得到历史聊天记录
export function getHistoryChat(msgList,userId){
    var arr=[];
    for(var i=0;i<msgList.length;i++){
        if(msgList[i].user.userId==userId){
            arr=msgList[i].msgs
            break;
        }
    }

    return chatSort(arr);

}


// 返回请求string
export function getString(msgNo,obj){
    switch (msgNo) {
        case '0100':            //login
            let url = '1'+msgNo+'{"timestamp":'+newDate()
            +',"body":{"loginType":'+obj.loginType
            +',"userId":'+obj.userId+',"roomId":'+obj.roomId
            +',"nonce":"'+obj.nonce
            +'","mode":'+obj.mode
            +',"ak":"'+obj.ak+'"},"msgId":""}'
            return url
            break;
        //获取房间基本信息
        case '0300':            
            let url1 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url1
            break;
        //私聊发送
        case '0210':         
            let url2 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"content":"'+obj.val+'","sendTo":["'+obj.userId+'"]},"msgId":""}'
            return url2
            break;
        //获取私聊历史消息
        case '0211':
            let url3 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url3
            break
        //房间图文列表
        case '0340':
            let url4 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"start":'+obj.start+',"size":'+obj.size+'},"msgId":""}'
            return url4
            break
        //获取ppt详情
        case '0321':
            let url5 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"id":"'+obj.id+'"},"msgId":""}'
            return url5
            break 
        
        //查看回放视频信息
        case '0331':
            let url6 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url6
            break
        //观众登记
        case '0105':
            let url7 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url7
            break
        //在线用户列表
        case '0120':
            let url8 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"start":"'+obj.start+'","size":"'+obj.size+'"},"msgId":""}'
            return url8
            break
        //获取客服列表
        case '0301':
            let url9 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url9
            break
        //获取联系人联系方式
        case '0304':
            let url10 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url10
            break
        //获取ppt信息
        case '0321':
            let url11 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"id":'+obj.id+'},"msgId":"3"}'
            return url11
            break
        case '0350':
            let url12 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url12
            break
        //轮播视频信息
        case '0332':
            let url13 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url13
            break 
        //房间点赞详情信息
        case '0351':
            let url14 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url14
            break
        //图集
        case '0360':
            let url15 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url15
            break

        //图集
        case '0310':
            let url16 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{},"msgId":""}'
            return url16
            break

        //发送群聊信息
        case '0200':
            let url17 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"content":"'+obj.content+'"},"msgId":"41"}'
            return url17
            break
        
        //获取群聊历史记录
        case '0201':
            let url18 = '1'+msgNo+'{"timestamp":'+newDate()+',"body":{"start":'+obj.start+',"size":'+obj.size+'},"msgId":"9"}'
            return url18
            break

       
    }
}



