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
    console.log('userDao-addUser');
    // if (params.accountName !== undefined) {
    //     var accountName = params.accountName;
    var SQL = 'select * from t_user';
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