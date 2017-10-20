/**
 * Created by zhubg on 2016/9/26.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rdsConnet = rdsConnet;
var mysql = require('mysql');

//创建连接
var rdsConnection = exports.rdsConnection = mysql.createConnection({
    host: 'rm-bp1s6u5an7440q6o8o.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'ai_root',
    password: '5!-AHiq5',
    database: 'aimarket_db'
});

//打开连接
function rdsConnet() {
    return new Promise(function (resolve, reject) {
        return rdsConnection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                // throw error;
            }
            resolve();
            console.log("rdsConnet");
            console.log('connected as id ' + rdsConnection.threadId);
        });
    });
}

rdsConnet();

//关闭连接
var rdsEnd = exports.rdsEnd = function rdsEnd(rdsConnection) {
    return new Promise(function (resolve, reject) {
        return rdsConnection.end(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                // throw error;
            }
            console.log("rdsEnd");
            console.log('connected end as id ' + rdsConnection.threadId);
            resolve();
        });
    });
};