//web3
const Web3 = require('web3');
import xiaoiAbi from '../abi/xiaoi';
import ATTAbi from '..//abi/ATT';
import busiAbi from '../abi/busi';

const {
  endpoint,
  busiAddr,
  proxyAddr,
  attAddr
} = require('../config/config.json');

const web3 = new Web3(new Web3.providers.HttpProvider(endpoint))
const xiaoiContract = web3.eth.contract(xiaoiAbi);
const busiContract = web3.eth.contract(busiAbi);
const ATTContract = web3.eth.contract(ATTAbi);
module.exports.web3 = web3;
module.exports.busi = busiContract.at(busiAddr);
module.exports.xiaoi = xiaoiContract.at(proxyAddr);
module.exports.att = ATTContract.at(attAddr);