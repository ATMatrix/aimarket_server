'use strict';
const charge = require('../charge');
const MicroRaiden = require('./uraiden');

class URaidenBilling {
  constructor(_url) {
    this._url = _url;
    this._uraiden = new MicroRaiden(this._url);
    this._charge = new charge;
  }

  async getPrice(ai_id, sender_addr) { 
    return await this._charge.getPrice(ai_id, sender_addr);
  }

  async bill(ai_id, sender_addr, receiver_addr, block_number, balance, price) {
    let fee = await this.getPrice(ai_id, sender_addr);
    console.log("fee:",fee); 
    if((+price) != (+fee)) throw 'price changed';  
    balance = (+balance) + (+fee);
    let res = await this._uraiden.incrementBalanceAndSign(sender_addr, receiver_addr, block_number, balance);
    if(res.statusCode == '200'){
      await this._charge.resetToken(fee, ai_id, sender_addr);
      return true;
    } else {
      return false;
    }
  }

  async openChannel(receiver_addr, deposit) {
    return await this._uraiden.openChannel(receiver_addr, deposit);
  }

  async topUpChannel(receiver_addr, block_number, deposit) {
    return await this._uraiden.topUpChannel(receiver_addr, block_number, deposit);
  }

  async closeChannel(receiver_addr, block_number, balance) {
    return await this._uraiden.closeChannel(receiver_addr, block_number, balance);
  }

  async settleChannel(receiver_addr, block_number) {
    return await this._uraiden.settleChannel(receiver_addr, block_number);
  }

  async getChannels(sender_addr, block_number, status) {
    return await this._uraiden.getChannels(sender_addr, block_number, status);
  }
}

module.exports = URaidenBilling;