/**
 * Created by zhubg on 2017/9/26.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _database = require('../../util/database');

exports.default = async function postInterceptor(data) {
    //断开连接
    // await rdsEnd(rdsConnection);
    return data;
};