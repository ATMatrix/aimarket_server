/**
 * Created by zhubg on 2016/9/26.
 */

'use strict';

var mysql = require('mysql');

//创建连接
export const rdsConnection = mysql.createConnection({
    host: 'host',
    port: 'port',
    user: 'username',
    password: 'password',
    database: 'database'
});

//打开连接
export function rdsConnet() {
    return new Promise(function (resolve, reject) {
        return rdsConnection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                throw error;
            }
            resolve();
            console.log("rdsConnet");
            console.log('connected as id ' + rdsConnection.threadId);
        });
    });
}

//关闭连接
export const rdsEnd = function (rdsConnection) {
    return new Promise(function (resolve, reject) {
        return rdsConnection.end(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                throw error;
            }
            console.log("rdsEnd");
            console.log('connected end as id ' + rdsConnection.threadId);
            resolve();
        });
    });
};