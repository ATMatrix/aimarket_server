/**
 * Created by zhubg on 2017/9/27.
 */
/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

import {UserList, Message, PageInfo} from '../../objects';
import {baseDao} from '../../../dao/baseDao';

export async function loginUser() {
    try {
        let params = {};
        params.offset = arguments[1].offset;
        params.count = arguments[1].count;
        //访问数据库Dao
        let obj = await baseDao('userDao', 'test', params);
        let totalCount = obj[0].totalCount;
        let userList = obj[0].userList;
        let hasNextPage = (arguments[1].offset + arguments[1].count) < obj[0].totalCount ? true : false;
        let endCursor = hasNextPage?arguments[1].offset + arguments[1].count:obj[0].totalCount;
        let pageInfo = new PageInfo(endCursor, hasNextPage);
        let UserListTemp = new UserList(totalCount, userList, pageInfo);
        let type = "UserList";
        let code = "600003";
        let content = JSON.stringify(UserListTemp);
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400003", err);
    }
}