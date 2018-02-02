/**
 * Created by 莫西干拳王 on 2018/1/22.
 */

'use strict';

import {Message} from '../../objects';
import {baseDao} from '../../../dao/baseDao';
const unirest = require("unirest");
import query from '../ai/query';
const URaidenBilling = require("../../../util/raiden/uraiden/uraidenBilling")
const uraidenServerUrl = 'http://127.0.0.1:5000';
const bill = new URaidenBilling(uraidenServerUrl);
const rp = require('request-promise')


export async function getChannel() {
    try {
        console.log("getChannel arguments", arguments);
        let params = JSON.parse(arguments[1].params);
        console.log("getChannel params", params);
        //访问数据库Dao
        let getAddrObj = await baseDao('channelDao', 'getChannel', params);
        console.log(getAddrObj);
        let content = JSON.stringify(getAddrObj);
        let type = "getChannel";
        let code = "600001";
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400001", err);
    }
}

export async function openChannel() {
    try {
        console.log("openChannel arguments", arguments);
        let params = JSON.parse(arguments[1].params);
        console.log("openChannel params", params);
        //访问数据库Dao
        let getAddrObj = await baseDao('channelDao', 'openChannel', params);
        console.log(getAddrObj);
        let content = JSON.stringify(getAddrObj);
        let type = "openChannel";
        let code = "600001";
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400001", err);
    }
}

export async function topUpChannel() {
    try {
        console.log("topUpChannel arguments", arguments);
        let params = JSON.parse(arguments[1].params);
        console.log("topUpChannel params", params);
        //访问数据库Dao
        let getAddrObj = await baseDao('channelDao', 'topUpChannel', params);
        console.log(getAddrObj);
        let content = JSON.stringify(getAddrObj);
        let type = "topUpChannel";
        let code = "600001";
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400001", err);
    }
}

export async function closeChannel() {
    try {
        console.log("closeChannel arguments", arguments);
        let params = JSON.parse(arguments[1].params);
        console.log("closeChannel params", params);

        let res = await bill.closeChannel(params.account, params.block, params.balance);
        console.log("-------res-------", res);
        let content = JSON.stringify(res);
        //访问数据库Dao
        let getAddrObj = await baseDao('channelDao', 'closeChannel', params);
        console.log(getAddrObj);
        // content += JSON.stringify(getAddrObj);
        let type = "closeChannel";
        let code = "600001";
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400001", err);
    }
}

export async function getPrice() {
    try {
      let content = 'fail';
      let type = "getPrice";
      let code = "600001";
      let params = JSON.parse(arguments[1].params);
      let ai_id = Buffer.from(params.ai_id, 'utf8').toString("hex")
      console.log("getPrice params", params);
      content = await bill.getPrice(ai_id, params.sender_addr);
      console.log("getPrice content", content);
      return new Message(type, code, content);
    } catch (err) {
      console.log(err);
      return new Message("error", "400001", err);
    }
}

export async function deduct() {
    try {
      let content = 'fail';
      let type = "deduct";
      let code = "600001";
      let params = JSON.parse(arguments[1].params);
      let ai_id = Buffer.from(params.ai_id, 'utf8').toString("hex")    
      console.log("deduct params: ", params);
      let res = false;
      console.log("params.balance_signature", params.balance_signature);
      if(params.balance_signature === "free")res = true;
      else res = await bill.bill(ai_id, params.account, params.receiver, params.block, params.balance, params.price, params.balance_signature)
      console.log("======res======", res);
      if(res == true){   
        console.log('shiwenshiwen',params.input);
        params.input.type = params.ai_id
        if(params.ai_id === 'xiaoi') {
            console.log("xiaoi api")
            let uri = `http://10.0.10.146:3000/ai/api/1/callxiaoi`;
            let question = params.input;
            const opts = {
            uri,
            body: question,
            json: true,
            }
            content = await rp.post(opts);
        }
        else content = await query(params.input);
        content = JSON.stringify(content);
        console.log("content", content);
      }
      return new Message(type, code, content);
    } catch (err) {
      console.log(err);
      return new Message("error", "400001", err);
    }
  }

  export async function setChannel() {
    try {
        console.log("setChannel arguments", arguments);
        let params = JSON.parse(arguments[1].params);
        console.log("setChannel params", params);
        //访问数据库Dao
        let getAddrObj = await baseDao('channelDao', 'setChannel', params);
        console.log(getAddrObj);
        let content = JSON.stringify(getAddrObj);
        let type = "setChannel";
        let code = "600001";
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400001", err);
    }
}