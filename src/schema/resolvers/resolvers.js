/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//获取token测试
import {getToken} from './getToken';
import {loginUser} from './user/loginUser';
import {addUser} from './user/addUser';
import {callAI} from './ai/callAI';
import {setAttAddress, getAttAddress} from './user/setAttAddress';
import {getAiList, getAiDetails} from './ai/getAiList';
import {transfer, closeChannel, getPrice, openChannel, topUpChannel, settleChannel, getChannels} from './bill/bill';


export const resolvers = {
  Query: {
    getToken,
    loginUser,
    addUser,
    callAI,
    setAttAddress,
    getAttAddress,
    getAiList,
    getPrice,
    getAiDetails,
    transfer,
    closeChannel,
    openChannel,
    topUpChannel,
    settleChannel,
    getChannels
  }
};
