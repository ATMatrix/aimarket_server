/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//获取token测试
import {getToken} from './getToken';
import {loginUser} from './user/loginUser';
import {addUser} from './user/addUser';
import {callAI} from './ai/callAI';
import {setAttAddress} from './user/setAttAddress';
import {getAttAddress} from './user/getAttAddress';
import {getAiList} from './ai/getAiList';
import {getAiDetails} from './ai/getAiDetails';
import {transfer, closeChannel, getPrice} from './bill/bill';


export const resolvers = {
  Query: {
    getToken,
    loginUser,
    addUser,
    callAI,
    setAttAddress,
    getAttAddress,
    getAiList,
    getAiDetails,
    transfer,
    closeChannel,
    getPrice
  }
};
