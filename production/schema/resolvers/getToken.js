/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getToken = getToken;

var _objects = require('../objects');

// import {baseDao} from '../../dao/baseDao';

async function getToken() {
    var token = require('crypto').randomBytes(10).toString('hex');
    var message = new _objects.Message();
    message.type = "info";
    message.code = "00001";
    message.content = "this is a message test";
    console.log("token_test");
    console.log(token);
    var params = {};
    // await baseDao('userDao', 'test', params);
    // return new Token(token);
    return message;
}