/**
 * Created by zhubg on 2017/5/14.
 */

'use strict';

import {Token,Message} from '../objects';
import {baseDao} from '../../dao/baseDao';

export async function getToken() {
    let token = require('crypto').randomBytes(10).toString('hex');
    let message = new Message();
    message.type = "info";
    message.code = "00001";
    message.content = "this is a message test";
    console.log("token_test");
    console.log(token);
    let params = {};
    await baseDao('userDao', 'test', params);
    // return new Token(token);
    return message;
}