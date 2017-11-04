'use strict';
const logEmitter = require('./schema/resolvers/ai/logEmitter')
const xiaoi = require('./xiaoi/index')

module.exports.socketServer = function (server) {
  const io = require('socket.io')(server);  
  const connections = [];
  let roomUser = {};
  let roomId = 1;
  let user = "";

  module.exports.connections = connections;
  io.on('connection', function (socket) {
    console.log('a user connected');
    console.log(socket.id);
    connections.push(socket);
    // socket.disconnect();
    //接受消息
    socket.on('callAI', function (msg) {
      console.log('receive messge : ' + msg);
      logEmitter.callAI(socket, msg);
    });
    
    socket.on('join', function (username) {
      user = username;
      // 将用户归类到房间
      if (!roomUser[roomId]) {
          roomUser[roomId] = [];
      }
      roomUser[roomId].push(user);
      socket.join(roomId);
      console.log('<p>'+user + '加入了房间</p>');
      socket.to(roomId).emit('sys', user + '加入了房间');
      socket.emit('sys',user + '加入了房间');
    }) 

       // 监听来自客户端的消息
    socket.on('message', function (msg) {
        // 验证如果用户不在房间内则不给发送
      if (roomUser[roomId].indexOf(user)< 0) {  
        return false;
      }
      console.log("message: ", msg);
      xiaoi({"question" : msg}).then(res => {
          console.log("xiaoi房管: ", user, res);
          socket.to(roomId).emit('xiaoi message', '@'+user+' '+res, 'xiaoi房管');
          socket.emit('xiaoi message', '@'+user+' '+res, 'xiaoi房管');
      });
      socket.to(roomId).emit('new message', user + '说：' + msg);
      socket.emit('new message', user + '说：' + msg);
    });


    //断开连接回调
    socket.on('disconnect', function () {
      console.log('socket disconnect');
      const index = connections.indexOf(socket);
      connections.splice(index, 1);
    });
  });
}

