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
    socket.emit('message', {
      stage : "BlockChain",
      err:'',
      res:'',
    })
    let eventFundsFrozen = busi.EventFundsFrozen({transactionHash:tx});
    let callID;
    eventFundsFrozen.watch((err, res)=>{
      console.log(res)
      if(!res && res.transactionHash === tx){
        callID = res.args._callID;
        socket.emit('message', {
          stage:'FrozenFunds',
          err,
          res,
        })
        eventFundsFrozen.stopWatching();
      }
    })

    let eventWorker = busi.EventWorker({transactionHash:tx});
    eventWorker.watch((err, res)=>{
      console.log(res)
      if(!res && res.args._callID === callID){
        socket.emit('message', {
          stage:'Worker',
          err,
          res,
        })
        eventFundsDeduct.stopWatching();
      } 
    })

    let eventFundsDeduct = busi.EventFundsDeduct({transactionHash:tx});
    eventFundsDeduct.watch((err, res)=>{
      console.log(res)
      if(!res && res.args._callID === callID){
        socket.emit('message', {
          stage:'DeductFunds',
          err,
          res,
        })
        eventFundsDeduct.stopWatching();
      }
    })

    let eventNewCallback = xiaoi.newCallback({transactionHash:tx});
    eventNewCallback.watch((err, res)=>{
      console.log(res)
      if(!res && res.args._callID === callID){
        socket.emit('message', {
          stage:'Results',
          err,
          res,
        })
        eventNewCallback.stopWatching();
      }
    });
  } catch (err) {
    console.log(err);
  }
}
