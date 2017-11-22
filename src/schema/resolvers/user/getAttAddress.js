/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

import _ from 'lodash';
import {Report, Message} from '../../objects';
import {baseDao} from '../../../dao/baseDao';

export async function getAttAddress() {
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
    let content = "";
    let checkExistUserObj = await baseDao('userDao', 'checkExistUser', params);
    if (checkExistUserObj.length !== 0) {
      let getAddrObj = await baseDao('userDao', 'getAttAddress', params);
      console.log("getAttAddress getAddrObj: ", getAddrObj);
      if ( getAddrObj[0].USER_ATT_ADDRESS !== undefined && getAddrObj[0].USER_ATT_ADDRESS !== null) {
        content = getAddrObj[0].USER_ATT_ADDRESS;
      } else {
        //fail
      }
      console.log(getAddrObj);
    } else {

    }
    console.log(checkExistUserObj);
    console.log(checkExistUserObj.length);

    let type = "getAttAddress";
    let code = "600001";

    // return new Message(type, code, 'test');
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400003", err);
  }
}