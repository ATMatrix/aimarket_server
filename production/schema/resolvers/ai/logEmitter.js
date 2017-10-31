'use strict';

var _require = require('../../../util/config/config.json'),
    endpoint = _require.endpoint,
    account = _require.account,
    cost = _require.cost,
    busiAddr = _require.busiAddr,
    proxyAddr = _require.proxyAddr,
    billAddr = _require.billAddr,
    registerAddr = _require.registerAddr,
    gasLimit = _require.gasLimit,
    attAddr = _require.attAddr;

var _require2 = require('../../../util/contract/contract.js'),
    web3 = _require2.web3,
    xiaoiContrac = _require2.xiaoiContrac,
    busiContract = _require2.busiContract,
    ATTContract = _require2.ATTContract,
    busi = _require2.busi,
    xiaoi = _require2.xiaoi,
    att = _require2.att;

module.exports.callAI = async function (socket, msg) {
  try {
    console.log(msg.aiID);

    // await att.generateTokens(account.address,100000,{from:account.address,gas:gasLimit});
    var a = await att.balanceOf(account.address, { from: account.address, gas: gasLimit });
    console.log(a);
    await att.approve(billAddr, 1000000, { from: account.address, gas: gasLimit });
    var b = await att.allowance(account.address, billAddr, { from: account.address, gas: gasLimit });
    console.log(b);
    console.log(msg.args);
    var aiID = msg.aiID;
    var tx = await xiaoi.callAI(aiID, JSON.stringify(msg.args), { from: account.address, gas: gasLimit });
    socket.emit('BlockChain', {
      BlockChain: "BlockChain"
    });
    var eventFundsFrozen = busi.EventFundsFrozen({ transactionHash: tx });
    eventFundsFrozen.watch(function (err, res) {
      console.log(res);
      socket.emit('FrozenFunds', {
        FrozenFunds: 'FrozenFunds',
        err: err,
        res: res
      });
      socket.emit('Worker', { Worker: "Worker" });
      eventFundsFrozen.stopWatching();
    });

    var eventFundsDeduct = busi.EventFundsDeduct({ transactionHash: tx });
    eventFundsDeduct.watch(function (err, res) {
      socket.emit('DeductFunds', {
        DeductFunds: 'DeductFunds',
        err: err,
        res: res
      });
      eventFundsDeduct.stopWatching();
    });

    var eventNewCallback = xiaoi.newCallback({ transactionHash: tx });
    eventNewCallback.watch(function (err, res) {
      socket.emit('CallBack', {
        CallBack: 'CallBack',
        err: err,
        res: res
      });
      eventNewCallback.stopWatching();
    });
  } catch (err) {
    console.log(err);
  }
};