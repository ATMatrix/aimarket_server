/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = addUser;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _objects = require('../../objects');

var _baseDao = require('../../../dao/baseDao');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addUser() {
  try {
    var flag = false;
    var affix = '';
    var reportType = '';
    var params = {};
    //解除引用
    params.user = _lodash2.default.cloneDeep(arguments[1].user);
    //访问数据库Dao
    var checkExistUserObj = await (0, _baseDao.baseDao)('userDao', 'checkExistUser', params);
    if (checkExistUserObj.length === 0) {
      var addUserObj = await (0, _baseDao.baseDao)('userDao', 'addUser', params);
      if (addUserObj.affectedRows !== undefined || addUser.affectedRows === 1) {
        flag = true;
        affix = 'success';
        reportType = 'addUserSuccessful';
      } else {
        //fail
        affix = 'fail';
      }
      console.log(addUserObj);
    } else {
      //用户名已经存在
      reportType = 'duplicateUsername';
      affix = 'fail';
    }
    console.log(checkExistUserObj);
    console.log(checkExistUserObj.length);

    var ReportTemp = new _objects.Report(reportType, flag, affix);
    var type = "addUser";
    var code = "600001";
    var content = JSON.stringify(ReportTemp);
    // return new Message(type, code, 'test');
    return new _objects.Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new _objects.Message("error", "400003", err);
  }
}