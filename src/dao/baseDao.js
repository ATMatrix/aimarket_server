/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

import {userDao} from './userDao/userDao';
import {aiDao} from './aiDao/aiDao';
import {channelDao} from './channelDao/channelDao'
//前置拦截器
import frontInterceptor from './interceptor/frontInterceptor'

//allDao注册
var dao = {};
// dao.lotteryRecordDao = lotteryRecordDao;
// dao.bettingRecordDao = bettingRecordDao;
dao.userDao = userDao;
dao.aiDao = aiDao;
dao.channelDao = channelDao;

//baseDao
export async function baseDao( module, method, params) {

    //frontInterceptor
    await frontInterceptor();
    
    //promise
    console.log('baseDao', dao);

    //cant find dao
    if(!dao[module]) {
        console.log('baseDao can not find dao['+module+']');
        return Promise.reject(
            'baseDao can not find dao['+module+']'
        );
    }

    return dao[module]( module, method, params);
}