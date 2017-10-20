/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//获取token测试

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvers = undefined;

var _getToken = require('./getToken');

var _loginUser = require('./user/loginUser');

var _addUser = require('./user/addUser');

var _callAI = require('./ai/callAI');

var resolvers = exports.resolvers = {
    Query: {
        getToken: _getToken.getToken,
        loginUser: _loginUser.loginUser,
        addUser: _addUser.addUser,
        callAI: _callAI.callAI
    }
};