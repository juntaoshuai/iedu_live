import {getString} from './common'
export const chatSize = 20		//初始化历史记录显示条数
export const picSize = 10       //初次加载图文列表显示条数

export default function(){
    //发送登录信息
    let url = getString('0100',userLogin)
    io.send(url)

    // 获取房间基本信息
    let roomMes = getString('0300')
    io.send(roomMes)

    //获取客服列表
    let userUrl = getString('0301')
    io.send(userUrl)
    //获取轮播视频
    let lbVideoUrl = getString('0332')
    io.send(lbVideoUrl)

    //获取在线用户列表
    let onlineUserUrl = getString('0120',{"start":0,"size":0})
    io.send(onlineUserUrl);

    //获取房间图文列表
    let picUrl = getString('0340',{"start":0,"size":picSize})
    io.send(picUrl)

    //获取联系人信息
    let aboutUrl = getString('0304')
    io.send(aboutUrl)

    //获取点赞详情
    let praiseUrl = getString('0351')
    io.send(praiseUrl)
    //私聊历史消息
    let chatUrl = getString('0211')
    io.send(chatUrl)

    //获取图集
    let tujiUrl = getString('0360')
    io.send(tujiUrl)

    //资料下载
    let  downloadUrl = getString('0310')
    io.send(downloadUrl)

    //发送群聊历史消息
    let pchatUrl=getString('0201',{"start":0,"size":10})
    io.send(pchatUrl)

    
}
