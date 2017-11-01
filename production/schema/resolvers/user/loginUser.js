/**
 * Created by zhubg on 2017/9/27.
 */
/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loginUser = loginUser;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _objects = require('../../objects');

var _baseDao = require('../../../dao/baseDao');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function loginUser() {
    try {
        console.log(arguments[1]);
        var params = {};
        params.user = _lodash2.default.cloneDeep(arguments[1].user);
        //访问数据库Dao
        var obj = await (0, _baseDao.baseDao)('userDao', 'loginUser', params);
        if (obj.length === 0) {
            return new _objects.Message("error", "400003", "accout/password is wrong!");
        }
        var type = "loginUser";
        var code = "600003";
        var content = "login success";
        return new _objects.Message(type, code, content);
    } catch (err) {
        console.log(err);
        return new _objects.Message("error", "400003", err);
    }
}