/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

import _ from 'lodash';
import {Report, Message} from '../../objects';
import {baseDao} from '../../../dao/baseDao';

export async function addUser() {
  try {
    let flag = false;
    let affix = '';
    let reportType = '';
    let params = {};
    //解除引用
    params.user = _.cloneDeep(arguments[1].user);
    //访问数据库Dao
    let checkExistUserObj = await baseDao('userDao', 'checkExistUser', params);
    if (checkExistUserObj.length === 0) {
      let addUserObj = await baseDao('userDao', 'addUser', params);
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

    let ReportTemp = new Report(reportType, flag, affix);
    let type = "addUser";
    let code = "600001";
    let content = JSON.stringify(ReportTemp);
    // return new Message(type, code, 'test');
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400003", err);
  }
}