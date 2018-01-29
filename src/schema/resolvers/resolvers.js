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
import {getAiList, getAiDetails, getAiListInfo} from './ai/getAiList';
import {transfer, getChannels} from './bill/bill';
import {getChannel, topUpChannel , openChannel, getPrice, deduct, setChannel, closeChannel} from './channel/channel'

export const resolvers = {
  Query: {
    getToken,
    loginUser,
    addUser,
    callAI,
    setAttAddress,
    getAttAddress,
    getAiList,
    getAiListInfo,
    getAiDetails,
    getPrice,
    transfer,
    closeChannel,
    openChannel,
    topUpChannel,
    getChannel,
    deduct,    
    getChannels,
    setChannel
  }
};
