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

export async function transfer() {
  try {
    let content = 'fail';
    let type = "transfer";
    let code = "600001";
    let params = JSON.parse(arguments[1].params);
    let ai_id = Buffer.from(params.ai_id, 'utf8').toString("hex")    
    console.log("transfer params: ", params);
    let res = await bill.bill(ai_id, params.sender_addr, params.receiver_addr, params.opening_block, params.balance, params.price, params.balance_signature)
    console.log("======res======", res);
    if(res == true){   
      console.log('shiwenshiwen',params.input);
      params.input['type'] = params.ai_id
      content = await query(params.input);
      console.log(content);
    }
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}

export async function openChannel() {
  try {
    let content = 'fail';
    let type = "openChannel";
    let code = "600001";
    let params = JSON.parse(arguments[1].params);
    let res = await bill.openChannel(params.receiver_addr, params.deposit);
    content = JSON.stringify(res);
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}

export async function topUpChannel() {
  try {
    let content = 'fail';
    let type = "topUpChannel";
    let code = "600001";
    let params = JSON.parse(arguments[1].params);
    let res = await bill.topUpChannel(params.receiver_addr, params.block_number, params.deposit);
    content = JSON.stringify(res);
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}

export async function closeChannel() {
  try {
    console.log("server close channel params: ", arguments);
    let content = 'fail';
    let type = "closeChannel";
    let code = "600001";
    let params = JSON.parse(arguments[1].params);
    let res = await bill.closeChannel(params.receiver_addr, params.block_number, params.balance);
    console.log("-------res-------", res);
    content = JSON.stringify(res);
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}

export async function settleChannel() {
  try {
    let content = 'fail';
    let type = "settleChannel";
    let code = "600001";
    let params = JSON.parse(arguments[1].params);
    let res = await bill.settleChannel(params.receiver_addr, params.block_number);
    content = JSON.stringify(res);
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}

export async function getChannels() {
  try {
    let content = 'fail';
    let type = "getChannels";
    let code = "600001";
    let params = JSON.parse(arguments[1].params);
    console.log("____params______", params);
    let res = await bill.getChannels(params.sender_addr, params.block_number, params.status);
    content = (res.body);
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}
