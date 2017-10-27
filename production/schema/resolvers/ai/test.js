/**
 * Created by zhubg on 2017/10/27.
 */
/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callAI = callAI;

var _objects = require('../../objects');

var _xiaoi = require('../../../util/abi/xiaoi');

var _xiaoi2 = _interopRequireDefault(_xiaoi);

var _ATT = require('../../../util/abi/ATT');

var _ATT2 = _interopRequireDefault(_ATT);

var _Register = require('../../../util/abi/Register');

var _Register2 = _interopRequireDefault(_Register);

var _busi = require('../../../util/abi/busi');

var _busi2 = _interopRequireDefault(_busi);

var _dbotBilling = require('../../../util/abi/dbotBilling');

var _dbotBilling2 = _interopRequireDefault(_dbotBilling);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require('crypto');
var rp = require('request-promise');

//web3
var Web3 = require('web3');
var fs = require('fs');
var config = require('../../../util/config/config.json');
var endpoint = config.endpoint,
    account = config.account,
    cost = config.cost,
    busiAddr = config.busiAddr,
    proxyAddr = config.proxyAddr,
    billAddr = config.billAddr,
    registerAddr = config.registerAddr,
    gasLimit = config.gasLimit,
    attAddr = config.attAddr;


var web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

async function callAI() {
  try {

    // console.log(registerAbi);

    // const registerContract = web3.eth.contract(registerAbi);
    var xiaoiContract = web3.eth.contract(_xiaoi2.default);
    var ATTContract = web3.eth.contract(_ATT2.default);
    var registerContract = web3.eth.contract(_Register2.default);
    var busiContract = web3.eth.contract(_busi2.default);
    var billContract = web3.eth.contract(_dbotBilling2.default);

    // const register = registerContract.at("0x5a158aef96b65176717baa63aa504552f9026b87");
    var bill = billContract.at(billAddr);
    var register = registerContract.at(registerAddr);
    var busi = busiContract.at(busiAddr);
    var xiaoi = xiaoiContract.at(proxyAddr);
    var att = ATTContract.at(attAddr);
    console.log("xiaoi");
    // console.log(xiaoi.callAI.toString());
    console.log(xiaoi.address);

    bill.allEvents('', function (error, log) {
      console.log(log);
    });
    att.allEvents('', function (error, log) {
      console.log(log);
    });
    register.allEvents('', function (error, log) {
      console.log(log);
    });
    busi.allEvents('', function (error, log) {
      console.log(log);
    });
    xiaoi.allEvents('', function (error, log) {
      console.log(log);
    });

    var eventNewCallback = xiaoi.newCallback();

    // result = await new Promise((resolve, reject) => {
    eventNewCallback.watch(function (error, result) {
      if (!error) {
        console.log(result);
        // resolve(result);
      } else {
        console.log(error);
        // resolve(error);
      }
      // eventNewCallback.stopWatching();
    });

    // const filter = web3.eth.filter();
    // filter.watch(function (error, log) {
    //   console.log(log);
    //   // filter.stopWatching();
    // });
  } catch (err) {
    console.log(err);
  }
}

callAI();