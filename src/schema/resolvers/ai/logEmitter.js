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
      if(!err && res.transactionHash === tx){
        callID = res.args._callID;
        socket.emit('message', {
          stage:'FrozenFunds',
          err,
          res,
        })
        eventFundsFrozen.stopWatching();
      }
    })

    let deductFundsMsg = null
    let resultMsg = null
    let workerDone = false
    let deductFundsDone = false

    let eventWorker = busi.EventWorker();
    eventWorker.watch((err, res)=>{
      console.log(res)
      if(!err && res.args._callID.equals(callID)) {
        socket.emit('message', {
          stage:'Worker',
          err,
          res,
        })
        eventWorker.stopWatching();
        if (deductFundsMsg) {
          socket.emit('message', deductFundsMsg)
          deductFundsDone = true
        }
        if (resultMsg && deductFundsDone) {
          socket.emit('message', resultMsg)
          socket.disconnect()
        }
        workerDone = true
      }
    })

    let eventFundsDeduct = busi.EventFundsDeduct();
    eventFundsDeduct.watch((err, res)=>{
      console.log(res)
      if(!err && res.args._callID.equals(callID)) {
        const resp = {
          stage:'DeductFunds',
          err,
          res,
        }
        if (workerDone) {
          socket.emit('message', resp)
          deductFundsDone = true
        } else {
          deductFundsMsg = resp
        }
        eventFundsDeduct.stopWatching();
        if (deductFundsDone && resultMsg) {
          socket.emit('message', resultMsg)
          socket.disconnect()
        }
      }
    })

    let eventNewCallback = xiaoi.newCallback();
    eventNewCallback.watch((err, res)=>{
      console.log(res)
      if(!err && res.args._callID.equals(callID)) {
        const resp = {
          stage:'Results',
          err,
          res,
        }
        if (deductFundsDone) {
          socket.emit('message', resp)
          socket.disconnect()
        } else {
          resultMsg = resp
        }
        eventNewCallback.stopWatching();
      }
    });
  } catch (err) {
    console.log(err);
  }
}
