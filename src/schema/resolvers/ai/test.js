/**
 * Created by zhubg on 2017/10/27.
 */
/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';
import {Message} from '../../objects';
var crypto = require('crypto');
var rp = require('request-promise');

//web3
const Web3 = require('web3');
const fs = require('fs');
const config = require('../../../util/config/config.json');
import xiaoiAbi from '../../../util/abi/xiaoi';
import ATTAbi from '../../../util/abi/ATT';
import registerAbi from '../../../util/abi/Register';
import busiAbi from '../../../util/abi/busi';
import billAbi from '../../../util/abi/dbotBilling';

const {
  endpoint,
  account,
  cost,
  busiAddr,
  proxyAddr,
  billAddr,
  registerAddr,
  gasLimit,
  attAddr
} = config;

const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));

export async function callAI() {
  try {

    // console.log(registerAbi);

    // const registerContract = web3.eth.contract(registerAbi);
    const xiaoiContract = web3.eth.contract(xiaoiAbi);
    const ATTContract = web3.eth.contract(ATTAbi);
    const registerContract = web3.eth.contract(registerAbi);
    const busiContract = web3.eth.contract(busiAbi);
    const billContract = web3.eth.contract(billAbi);

    // const register = registerContract.at("0x5a158aef96b65176717baa63aa504552f9026b87");
    const bill = billContract.at(billAddr);
    const register = registerContract.at(registerAddr);
    const busi = busiContract.at(busiAddr);
    const xiaoi = xiaoiContract.at(proxyAddr);
    const att = ATTContract.at(attAddr);
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
