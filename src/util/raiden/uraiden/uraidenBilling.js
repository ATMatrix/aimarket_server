'use strict';
const charge = require('../charge');
const URaidenClient = require('./uraidenClient');

class URaidenBilling {
  constructor(_url) {
    this._url = _url;
    this._uraiden = new URaidenClient(this._url);
    this._charge = new charge;
  }

  async getPrice(ai_id, sender_addr) { 
    return await this._charge.getPrice(ai_id, sender_addr);
  }

  async bill(ai_id, sender_addr, opening_block, balance, balance_signature) {
    let fee = await this.getPrice(ai_id, sender_addr);
    console.log("fee:",fee); 
    if(balance < fee) throw 'more balance required';  //todo:: before balance + fee < balance
    let res = await this._uraiden.transfer(sender_addr, opening_block, balance, balance_signature);
    if(res.statusCode == '200'){
      await this._charge.resetToken(fee, ai_id, sender_addr);
      return true;
    } else {
      return false;
    }
  }

}

module.exports = URaidenBilling;