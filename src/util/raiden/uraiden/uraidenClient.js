'use strict';

const unirest = require("unirest");
const unirest_prom = require('../unireset_promise');

class URaidenClient {
  constructor(url, version = '1') {
    this._url = url;
    this._version = version;
    this._apis = {
      'transfer': `/api/${this._version}/channels/transfer`,
    }
  }

  transfer(sender_address, opening_block, balance, balance_signature) {
    let req = unirest.put(`${this._url}${this._apis['transfer']}/${sender_address}/${opening_block}`)
      .type("json")
      .header('charset', 'UTF-8')
      .send({
        balance,
        balance_signature
      });
    return unirest_prom(req);
  }
}

module.exports = URaidenClient