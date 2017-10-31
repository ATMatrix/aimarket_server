/**
 * Created by zhubg on 2017/2/18.
 */
//storages
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import {Toast} from 'antd-mobile';

// SocketIO初始化
global.globalSocket = {};

var storages = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24 * 7,
    enableCache: true
});
global.globalStorage = storages;

//serverIP
// const serverIP = "http://135.10.16.17:3000/graphql";
const serverIP = "http://139.196.80.85:3000/graphql";
// const serverIP = "http://www.elfdragontechnology.cn:3000/graphql";
global.globalServerIP = serverIP;

//WsServerIP
const wsServerIP = "http://139.196.80.85:3001";
// const wsServerIP = "http://135.10.16.17:3001";
// const wsServerIP = "http://www.elfdragontechnology.cn:3001";
global.globalWsServerIP = wsServerIP;

//user
globalStorage.load({
    key: 'loginState',
    autoSync: true,
    syncInBackground: true,
    syncParams: {}
}).then(ret => {
    //global.globalUser {accountName,,token}
    console.log("globalUser");
    global.globalUser = ret;
    console.log(globalUser);
    Toast.loading("连接中", 0);
    // SocketIO数据填充
    // You need to set `window.navigator` to something in order to use the socket.io
    // client. You have to do it like this in order to use the debugger because the
    // debugger in React Native runs in a webworker and only has a getter method for
    // `window.navigator`.
    window.navigator.userAgent = 'ReactNative';
    var socket = require('socket.io-client')(globalWsServerIP, {
        transports: ['websocket'] // you need to explicitly tell it to use websockets
    });
    socket.on('connect', function () {
        // console.log(socket.id); // 'G5p5...'
        //认证参数
        socket.emit('authentication', {
            accountName:globalUser.accountName,
            token: globalUser.token
        });
        socket.on('authenticated', function () {
            // use the socket as usual
            console.log("authenticated");
            //验证后取消首次错误监听
            socket.removeListener('connect_error');
            Toast.hide();
            //接收消息
        });
        socket.on('unauthorized', function (err) {
            //用户名、口令验证错误
            console.log("非法操作:", err.message);
        });

        socket.on('disconnect', function () {
            //聊天服务器断开
            console.log('socket disconnect');
            //锁屏
            Toast.loading("聊天服务器断开",0);
        });
    });
    socket.on('connect_error', function (err) {
        console.log(err);
        Toast.loading("聊天服务器已经断开连接", 0);
        socket.removeListener('connect_error');
    });
    global.globalSocket = socket;

}).catch(err => {
    switch (err.name) {
        case 'NotFoundError':
            // TODO;
            console.log("没有数据");
            global.globalUser={};
            break;
        case 'ExpiredError':
            // TODO
            console.log("数据过期");
            global.globalUser={};
            break;
    }
});


export {serverIP};




globalSocket.on('some event', function (msg) {
    console.log('receive messge : ' + msg);
    let temp = that.state.messages;
    temp.push(msg);
    console.log("yOffset-1: " + that.state.yOffset);
    that.setState({
        messages: temp,
        messagesNumber: that.state.messagesNumber + 1,
        yOffset: that.state.yOffset + 110
    });
    console.log("messagesNumber: " + that.state.messagesNumber);
    console.log("yOffset-2: " + that.state.yOffset);
    if ((!that.state.keyboardHideFlag) && (that.state.messagesNumber > 2)) {
        _scrollView.scrollTo({y: that.state.yOffset - 220, animated: false});
    } else if ((that.state.keyboardHideFlag) && (that.state.messagesNumber > 4)) {
        _scrollView.scrollTo({y: that.state.yOffset - 440, animated: false});
    }
});

globalSocket.on('serverToClientMessage', function (msg) {
    console.log("serverToClientMessage");
    console.log(msg);
    if (msg.command === "getBettingInformation") {
        that.getBettingInformation();
    }
});