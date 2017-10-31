'use strict';

var logEmitter = require('./schema/resolvers/ai/logEmitter');

module.exports.socketServer = function (server) {
  var io = require('socket.io')(server);
  var connections = [];
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

    //断开连接回调
    socket.on('disconnect', function () {
      console.log('socket disconnect');
      var index = connections.indexOf(socket);
      connections.splice(index, 1);
    });
  });
};