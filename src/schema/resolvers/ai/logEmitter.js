'use strict';
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
} = require('../../../util/config/config.json');

const {
  web3, 
  xiaoiContrac,
  busiContract,
  ATTContract,
  busi, 
  xiaoi, 
  att 
} = require('../../../util/contract/contract.js')

module.exports.callAI = async function (socket, msg) {
  try {
    console.log(msg.aiID);
    
    // await att.generateTokens(account.address,100000,{from:account.address,gas:gasLimit});
    let a = await att.balanceOf(account.address,{from:account.address,gas:gasLimit});
    console.log(a);
    await att.approve(billAddr, 1000000,{from:account.address,gas:gasLimit});
    let b = await att.allowance(account.address, billAddr, {from:account.address,gas:gasLimit});
    console.log(b);
    console.log(msg.args);
    let aiID = msg.aiID;
    let tx = await xiaoi.callAI(aiID, JSON.stringify(msg.args), {from:account.address,gas:gasLimit});
    socket.emit('BlockChain', {
      stage : "BlockChain",
      err:'',
      res:''
    })
    let eventFundsFrozen = busi.EventFundsFrozen({transactionHash:tx});
    eventFundsFrozen.watch((err, res)=>{
      socket.emit('FrozenFunds', {
        stage:'FrozenFunds',
        err:err,
        res:res
      })
      eventFundsFrozen.stopWatching();
    })         

    let eventWorker = busi.EventWorker({transactionHash:tx});
    eventWorker.watch((err, res)=>{
      socket.emit('Worker', {
        stage:'Worker',
        err:err,
        res:res
      })
      eventFundsDeduct.stopWatching();
    }) 

    let eventFundsDeduct = busi.EventFundsDeduct({transactionHash:tx});
    eventFundsDeduct.watch((err, res)=>{
      socket.emit('DeductFunds', {
        stage:'DeductFunds',
        err:err,
        res:res
      })
      eventFundsDeduct.stopWatching();
    }) 
    
    let eventNewCallback = xiaoi.newCallback({transactionHash:tx});
    eventNewCallback.watch((err, res)=>{
      socket.emit('CallBack', {
        stage:'CallBack',
        err:err,
        res:res
      })
      eventNewCallback.stopWatching();
    });
  } catch (err) {
    console.log(err);
  }
}

