'use strict';

import {
  Message
} from '../../objects';
import _ from 'lodash';
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
    let ai_id = params.ai_id;
    let xiaoi = Buffer.from(ai_id, 'utf8').toString("hex")    
    let res = await bill.bill(xiaoi, params.sender_addr, params.opening_block, params.balance, params.balance_signature)
    if(res === true){
      const xiaoi = require('../../../xiaoi/index')      
      content = await xiaoi({"question" : params.input});
    }
    return new Message(type, code, content);
  } catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}
