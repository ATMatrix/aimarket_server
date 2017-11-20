'use strict';
const logEmitter = require('./schema/resolvers/ai/logEmitter')
const xiaoi = require('./xiaoi/index')

module.exports.socketServer = function (server) {
  const io = require('socket.io')(server);
  io.path('/demows');
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
      // io.to(roomId).emit('sys', user + '加入了房间');
      io.emit('sys',user + '加入了房间');
    })

       // 监听来自客户端的消息
    socket.on('clientMsg', async function (msg) {
      console.log('clientmsg',msg)
        // 验证如果用户不在房间内则不给发送
      // if (roomUser[roomId].indexOf(user)< 0) {
      //   return false;
      // }
      const nlp = require('./schema/resolvers/api/nlp');
      const content = await nlp({text: msg.input});
      const prob = content.items[0]
      const rType = ['负向', '中性', '正向']
      const pType = ['negative_prob', 1, 'positive_prob']
      const analysis = {
        情感分析结果: rType[prob.sentiment],
        置信度: prob.confidence,
        result: prob.sentiment,
        user: msg.username,
        input: msg.input
      }
      if (prob.sentiment === 0 || prob.sentiment === 2) {
        analysis['概率'] = prob[pType[prob.sentiment]]
      }
      const mm = JSON.stringify(analysis)
      io.emit('new message', mm);
      let user = msg.username;
      xiaoi({"question" : msg.input}).then(res => {
          console.log("xiaoi房管: ", user, res);
          // io.to(roomId).emit('xiaoi message', '@'+user+' '+res, 'xiaoi房管');
          io.emit('xiaoi message', '@'+user+' '+res, 'xiaoi房管');
      });
      // io.to(roomId).emit('new message', user + '说：' + msg);
    });


    //断开连接回调
    socket.on('disconnect', function () {
      console.log('socket disconnect');
      const index = connections.indexOf(socket);
      connections.splice(index, 1);
    });
  });
}

