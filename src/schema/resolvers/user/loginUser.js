/**
 * Created by zhubg on 2017/9/27.
 */
/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

import _ from 'lodash';
import {UserList, Message, PageInfo} from '../../objects';
import {baseDao} from '../../../dao/baseDao';

export async function loginUser() {
    try {
        console.log(arguments[1])
        let params = {};
        params.user = _.cloneDeep(arguments[1].user);
        //访问数据库Dao
        let obj = await baseDao('userDao', 'loginUser', params);
        if (obj.length === 0) {
            return new Message("error", "400003", "accout/password is wrong!");            
        } 
        let type = "loginUser";
        let code = "600003";
        let content = "login success";
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400003", err);
    }
}