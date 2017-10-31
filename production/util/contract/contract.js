'use strict';

var _xiaoi = require('../abi/xiaoi');

var _xiaoi2 = _interopRequireDefault(_xiaoi);

var _ATT = require('..//abi/ATT');

var _ATT2 = _interopRequireDefault(_ATT);

var _busi = require('../abi/busi');

var _busi2 = _interopRequireDefault(_busi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//web3
var Web3 = require('web3');

var _require = require('../config/config.json'),
    endpoint = _require.endpoint,
    busiAddr = _require.busiAddr,
    proxyAddr = _require.proxyAddr,
    attAddr = _require.attAddr;

var web3 = new Web3(new Web3.providers.HttpProvider(endpoint));
var xiaoiContract = web3.eth.contract(_xiaoi2.default);
var busiContract = web3.eth.contract(_busi2.default);
var ATTContract = web3.eth.contract(_ATT2.default);
module.exports.web3 = web3;
module.exports.busi = busiContract.at(busiAddr);
module.exports.xiaoi = xiaoiContract.at(proxyAddr);
module.exports.att = ATTContract.at(attAddr);