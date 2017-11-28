'use strict';

const RaidenClient = require('./raidenClient');
const charge = require('../charge');

const token_addr = "0x0f114a1e9db192502e7856309cc899952b3db1ed";

class RaidenBilling {
  constructor(consumer_url, beneficiary_url) {
    this._consumer_url = consumer_url;
    this._beneficiary_url = beneficiary_url;
    this._token_addr = token_addr;
    this._consumer_raiden = new RaidenClient(this._consumer_url);
    this._beneficiary_raiden = new RaidenClient(this._beneficiary_url);
    this._charge = new charge;
  }

  async initAddress() {
    this._consumer_addr = (await this._consumer_raiden.address()).body.our_address;
    this._beneficiary_addr = (await this._beneficiary_raiden.address()).body.our_address;
    console.log("_consumer_addr:",this._consumer_addr);
    console.log("_beneficiary_addr:",this._beneficiary_addr);
  }

  async getPrice(aiID) {
    await this.initAddress();  //todo::once  
    return await this._charge.getPrice(aiID, this._consumer_addr);
  }

  async bill(aiID) {
    let fee = await this.getPrice(aiID);
    console.log("fee:",fee);
    let res = await this._consumer_raiden.transfer(this._token_addr, this._beneficiary_addr, fee);
    console.log('transfer:', res.body);
    if(res.statusCode == '200'){
      this._charge.resetToken(fee, aiID, this._consumer_addr);
      return true;
    } else {
      return false;
    }
  }

}

module.exports = RaidenBilling;

const bill = new RaidenBilling("http://106.14.207.120:5001","http://106.14.207.120:5002");
aiID = Buffer.from('xiaoi', 'utf8').toString("hex")
bill.bill(aiID);