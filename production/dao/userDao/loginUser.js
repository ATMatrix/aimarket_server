/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

//后置拦截器

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loginUser = loginUser;

var _postInterceptor = require('../interceptor/postInterceptor');

var _postInterceptor2 = _interopRequireDefault(_postInterceptor);

var _database = require('../../util/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//addUser
function loginUser(module, method, params) {
    //some code
    console.log('userDao-loginUser');
    if (params.user !== undefined) {
        var username = params.user.username;
        var password = params.user.password;
        var _SQL = ' SELECT * FROM t_user t WHERE t.USER_ID = ? AND t.USER_PASSWORD = ? ';
        var bindVars = [username, password];
        //promise
        return new Promise(function (resolve, reject) {
            _database.rdsConnection.query(_SQL, bindVars, function (error, results, fields) {
                if (error) {
                    throw error;
                }
                // console.log(results);
                resolve((0, _postInterceptor2.default)(results));
            });
        });
    } else {
        throw 'params.user Undefined!Check it!';
    }

    //promise
    return new Promise(function (resolve, reject) {
        _database.rdsConnection.query(SQL, function (error, results, fields) {
            if (error) {
                throw error;
            }
            console.log(results);
            resolve((0, _postInterceptor2.default)(results));
        });
    });
}

//连接DB