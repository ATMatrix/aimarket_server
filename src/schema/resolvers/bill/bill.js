'use strict';

import {
  Message
} from '../../objects';
import _ from 'lodash';
import query from '../ai/query';
const unirest = require("unirest");
const URaidenBilling = require("../../../util/raiden/uraiden/uraidenBilling")
const uraidenServerUrl = 'http://127.0.0.1:5000';
const bill = new URaidenBilling(uraidenServerUrl);

export async function transfer() {
  try {
    let content = 'fail';
    let type = "transfer";
    let code = "600001";
    let params = JSON.parse(arguments[1].params);
    let ai_id = Buffer.from(params.ai_id, 'utf8').toString("hex")    
    let res = await bill.bill(ai_id, params.sender_addr, params.opening_block, params.balance, params.balance_signature)
    if(res === true){   
      content = await query({type:params.ai_id, question : params.input});
      console.log(content);
    }
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}


export async function closeChannel() {
  try {
    let content = 'fail';
    let type = "closeChannel";
    let code = "600001";
    let params = JSON.parse(arguments[1].params);
    let res = await bill.closeChannel(params.sender_addr, params.opening_block, params.balance);
    content = JSON.stringify(res.body);
    return new Message(type, code, content);
  } catch (err) {
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
    content = await bill.getPrice(ai_id, params.sender_addr);
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}