'use strict';

const {
  baseDao
} = require('../../dao/baseDao');
const URaidenBilling = require("../../util/raiden/uraiden/uraidenBilling")
const uraidenServerUrl = 'http://127.0.0.1:5000';
const bill = new URaidenBilling(uraidenServerUrl);

async function getAiList(tags) {
  let res = await baseDao('aiDao', 'getAiList', tags);
  console.log(res);
  return res;
}

async function getAiInfo(id) {
  let res = await baseDao('aiDao', 'getAiInfo', id);
  console.log(res);
  return res;
}

async function callAI(params) {
  let ai_id = Buffer.from(params.ai_id, 'utf8').toString("hex")    
  let res = await bill.bill(ai_id, params.sender_addr, params.receiver_addr, params.block_number, params.balance, params.price)
  if(res === true){   
    return await query({type:params.ai_id, question : params.input});
  }
  return res;
}

async function getPrice(params) {
  let ai_id = Buffer.from(params.ai_id, 'utf8').toString("hex")
  return await bill.getPrice(ai_id, params.sender_addr);
}

module.exports = {
  getAiList,
  getAiInfo,
  callAI,
  getPrice
}