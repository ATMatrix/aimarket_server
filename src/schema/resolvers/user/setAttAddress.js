/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

import _ from 'lodash';
import {Report, Message} from '../../objects';
import {baseDao} from '../../../dao/baseDao';

export async function setAttAddress() {
  try {
    let flag = false;
    let affix = '';
    let reportType = '';
    let params = {};
    //解除引用
    console.log("arguments: ", arguments[1])
    params.user = _.cloneDeep(JSON.parse(arguments[1].params).user);
    console.log("params:",  params)
    //访问数据库Dao
    let checkExistUserObj = await baseDao('userDao', 'checkExistUser', params);
    if (checkExistUserObj.length !== 0) {
      let setAddrObj = await baseDao('userDao', 'setAttAddress', params);
      if (setAddrObj.affectedRows !== undefined || setAddrObj.affectedRows === 1) {
        flag = true;
        affix = 'success';
        reportType = 'setAddrObjSuccessful';
      } else {
        //fail
        affix = 'fail';
      }
      console.log(setAddrObj);
    } else {
      //用户名不存在
      reportType = 'Username not existed!';
      affix = 'fail';
    }
    console.log(checkExistUserObj);
    console.log(checkExistUserObj.length);

    let ReportTemp = new Report(reportType, flag, affix);
    let type = "setAttAddress";
    let code = "600001";
    let content = JSON.stringify(ReportTemp);
    // return new Message(type, code, 'test');
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400003", err);
  }
}