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

var _objects = require('../../objects');

var _baseDao = require('../../../dao/baseDao');

async function loginUser() {
    try {
        var params = {};
        params.offset = arguments[1].offset;
        params.count = arguments[1].count;
        //访问数据库Dao
        var obj = await (0, _baseDao.baseDao)('userDao', 'test', params);
        var totalCount = obj[0].totalCount;
        var userList = obj[0].userList;
        var hasNextPage = arguments[1].offset + arguments[1].count < obj[0].totalCount ? true : false;
        var endCursor = hasNextPage ? arguments[1].offset + arguments[1].count : obj[0].totalCount;
        var pageInfo = new _objects.PageInfo(endCursor, hasNextPage);
        var UserListTemp = new _objects.UserList(totalCount, userList, pageInfo);
        var type = "UserList";
        var code = "600003";
        var content = JSON.stringify(UserListTemp);
        return new _objects.Message(type, code, content);
    } catch (err) {
        console.log(err);
        return new _objects.Message("error", "400003", err);
    }
}