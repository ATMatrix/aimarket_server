'use strict';

import contractUtil from '../../truffleContract';
import config from '../../../../config';
import Channel from './channel';

const unirest = require("unirest");
const unirest_prom = require('../uniresetPromise');

const {
  endpoint,
  account,
  cost,
  gas,
  contracts,
} = config.blockchain
const {
  web3,
  token,
  uraiden
} = contractUtil

const callConf = {
  from: account.address,
  gas,
}

class MicroRaiden {

  constructor(url, version = '1') {
    this.web3 = web3;
    this.token = token;
    this.contract = uraiden;
    this._url = url;
    this._version = version;
    this.decimals = 18;
    this._apis = {
      'transfer': `/api/${this._version}/channels/transfer`,
      'channels': `/api/${this._version}/channels`
    }
  }

  num2bal(value) {
    return Math.floor(value * Math.pow(10, this.decimals));
  }

  bal2num(bal) {
    return bal && bal.div ?
      bal.div(Math.pow(10, this.decimals)) :
      bal / Math.pow(10, this.decimals);
  }

  encodeHex(str, zPadLength) {
    /* Encode a string or number as hexadecimal, without '0x' prefix
     */
    if (typeof str === "number") {
      str = str.toString(16);
    } else {
      str = [...str].map((char) =>
          char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
    }
    return str.padStart(zPadLength, '0');
  }

  async openChannel(receiver_address, deposit) {
    deposit = this.num2bal(deposit);    
    this.web3.personal.unlockAccount(account.address, account.password);
    let balance = await this.token.balanceOf(account.address, callConf);
    if (balance.toNumber() < deposit) throw `Not enough tokens. Token balance = ${this.bal2num(balance)}, required = ${this.bal2num(deposit)}`;
    let tx = {};
    if (typeof this.token.contract.transfer['address,uint256,bytes'] === 'function') {
      tx.tx = await this.token.contract.transfer["address,uint256,bytes"](
        this.contract.address,
        deposit,
        receiver_address,
        callConf
      );
      console.log(tx.tx);
      let receipt = await this.waitTx(tx.tx, 1);
      console.log(receipt);
      tx.receipt = receipt;
    } else {
      await this.token.approve(
        this.contract.address,
        deposit,
        callConf
      );
      tx = await this.contract.createChannelERC20(
        receiver_address,
        deposit,
        callConf
      );
      console.log(tx.logs); //todo:ChannelCreated logs
    }
    let info = await this.contract.getChannelInfo(
      account.address,
      receiver_address,
      tx.receipt.blockNumber,
      callConf
    );
    console.log(info);
    return info;
  }

  async topUpChannel(receiver_address, block_number, deposit) {
    deposit = this.num2bal(deposit);    
    this.web3.personal.unlockAccount(account.address, account.password);
    let balance = await this.token.balanceOf(account.address, callConf);
    if (balance.toNumber() < deposit) throw `Not enough tokens. Token balance = ${this.bal2num(balance)}, required = ${this.bal2num(deposit)}`;
    let tx = {};
    if (typeof this.token.contract.transfer["address,uint256,bytes"] === "function") {
      tx.tx = await this.token.contract.transfer["address,uint256,bytes"](
        this.contract.address,
        deposit,
        receiver_address + this.encodeHex(block_number, 8), // receiver goes as 3rd param, 20 bytes, plus blocknumber, 4bytes        
        callConf
      );
      let receipt = await this.waitTx(tx.tx, 1);
      console.log(receipt);
      tx.receipt = receipt;
    } else {
      await this.token.approve(
        this.contract.address,
        deposit,
        callConf
      );
      tx = await this.contract.topUpERC20(
        receiver_address,
        block_number,
        deposit,
        callConf
      )
      console.log(tx.logs); //todo:topUp logs      
    }
    let info = await this.contract.getChannelInfo(
      account.address,
      receiver_address,
      tx.receipt.blockNumber,
      callConf
    );
    console.log(info);
    return info;
  }

  async closeChannel(receiver_address, block_number, balance) {
    // let a = await token.balanceOf(account.address, callConf);
    // console.log(a);
    let res = await this.closeRequest(account.address, block_number, balance);
    let closeSign = res.body.close_signature;
    let sign = await this.signBalance(receiver_address, block_number, balance);
    let params = [
      receiver_address,
      block_number,
      this.num2bal(balance),
      sign
    ];
    let paramsTypes = "address,uint32,uint192,bytes";
    if (closeSign) {
      params.push(closeSign);
      paramsTypes += ",bytes";
    }
    let tx = await this.contract.contract.close(
      ...params,
      callConf
    );
    console.log(tx);
    let receipt = await this.waitTx(tx, 0);
    console.log(receipt);
    // a = await token.balanceOf(account.address, callConf);
    // console.log(a);
    return receipt;
  }

  async settleChannel(receiver_address, block_number) {
    this.web3.personal.unlockAccount(account.address, account.password);    
    let tx = await this.contract.contract.settle(
      receiver_address,
      block_number,
      callConf
    );
    let receipt = await this.waitTx(tx, 0);
    console.log(receipt);
    return receipt;
  }

  async signMessage(msg) {
    const hex = '0x' + this.encodeHex(msg);
    console.log(`Signing "${msg}" => ${hex}, account: ${account.address}`);
    let sign = this.web3.eth.sign(account.address, hex);
    console.log(sign);
    return sign;
  }

  async signBalance(receiver_address, block_number, newBalance) {
    this.web3.personal.unlockAccount(account.address, account.password);
    let msg = await this.contract.getBalanceMessage(
      receiver_address,
      block_number,
      this.num2bal(newBalance),
      callConf
    );
    return await this.signMessage(msg);
  }

  async incrementBalanceAndSign(sender_address, receiver_address, block_number, newBalance) {
    let sign = await this.signBalance(receiver_address, block_number, newBalance);
    let res = await this.transfer(sender_address, block_number, newBalance, sign);
    console.log(res);
    return res;
  }

  transfer(sender_address, block_number, balance, balance_signature) {
    let req = unirest.put(`${this._url}${this._apis['transfer']}/${sender_address}/${block_number}`)
      .type("json")
      .header('charset', 'UTF-8')
      .send({
        balance,
        balance_signature
      });
    return unirest_prom(req);
  }

  closeRequest(sender_address, block_number, balance) {
    let req = unirest.delete(`${this._url}${this._apis['channels']}/${sender_address}/${block_number}`)
      .type("json")
      .header('charset', 'UTF-8')
      .send({
        balance
      });
    return unirest_prom(req);
  }

  getChannels(sender_address, block_number, status = 'open') {
    let url = `${this._url}${this._apis['channels']}/${sender_address}`;
    if (Number.isInteger(block_number)) {
      url += `/${block_number}`;
    }
    url += `?status=${status}`;
    let req = unirest.get(url);
    return unirest_prom(req);
  }

  waitTx(txHash, confirmations) {
    return new Promise((resolve, reject) => {
      /*
       * Watch for a particular transaction hash and call the awaiting function when done;
       * Got it from: https://github.com/ethereum/web3.js/issues/393
       */
      let blockCounter = 30;
      confirmations = +confirmations || 0;
      // Wait for tx to be finished
      let filter = this.web3.eth.filter('latest');
      filter.watch((err, blockHash) => {
        if (blockCounter <= 0) {
          if (filter) {
            filter.stopWatching();
            filter = null;
          }
          console.warn('!! Tx expired !!', txHash);
          reject(new Error("Tx expired: " + txHash));
        }
        // Get info about latest Ethereum block
        return this.web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
          if (err) {
            if (filter) {
              filter.stopWatching();
              filter = null;
            }
            reject(err);
          } else if (!receipt || !receipt.blockNumber) {
            return console.log('Waiting tx..', --blockCounter);
          } else if (confirmations > 0) {
            console.log('Waiting confirmations...', confirmations);
            return --confirmations;
          }
          // Tx is finished
          if (filter) {
            filter.stopWatching();
            filter = null;
          }
          resolve(receipt);
        });
      });
      return filter;
    })
  }
}

module.exports = MicroRaiden;
