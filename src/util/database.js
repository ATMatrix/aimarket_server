/**
 * Created by zhubg on 2016/9/26.
 */

'use strict';

var mysql = require('mysql');

const poolConfig = {
    connectionLimit: 10,
    host: '118.31.18.101',
    port: 4006,
    user: 'ai_root',
    password: '5!-AHiq5',
    database: 'aimarket_db'
}

//创建连接
export const pool = mysql.createPool(poolConfig);

//打开连接
export function poolConnection() {
    return new Promise(function (resolve, reject) {
        return pool.getConnection(function (err, connection) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject(err);
            }
            resolve(connection);
            console.log("rdsConnet");
            console.log('connected as id ' + connection.threadId);
        });
    });
}

poolConnection().then(function (connection) {
    connection.ping(function (err) {
        if (err) throw err;
        console.log('Server responded to ping');
    })
    connection.release();
});

//关闭连接池
export const poolEnd = function () {
    return new Promise(function (resolve, reject) {
        return pool.end(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject(err);
            }
            console.log("poolEnd");
            resolve();
        });
    });
};

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});


pool.on('connection', function (connection) {
    // connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});


pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});