/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//获取token测试
import {getToken} from './getToken';
import {loginUser} from './user/loginUser';
import {addUser} from './user/addUser';
import {callAI} from './ai/callAI';


export const resolvers = {
    Query: {
        getToken,
        loginUser,
        addUser,
        callAI
        }
};