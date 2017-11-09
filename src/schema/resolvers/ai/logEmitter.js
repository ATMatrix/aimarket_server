'use strict';

const {
  endpoint,
  account,
  cost,
  gasLimit,
  contracts,
} = require('../../../util/config').blockchain;

const {
  web3,
  biz,
  consumer,
  att
} = require('../../../util/contracts.js')


module.exports.callAI = async (socket, msg) => {
  try {
    console.log(msg.aiID);

    const callConf = {
      from: account.address,
      gas: gasLimit,
    }

    const a = await att
      .balanceOf(account.address, callConf);
    console.log(a);

    await att
      .approve(billAddr, 1000000, callConf);

    const b = await att
      .allowance(account.address, contracts.bill, callConf);
    console.log(b);

    console.log(msg.args);

    const aiID = msg.aiID;
    const args = JSON.stringify(msg.args)
    const tx = await consumer
      .callAI(aiID, args, callConf);
    socket.emit('message', {
      stage : "BlockChain",
      err:'',
      res:'',
    })

    const eventFundsFrozen = biz
      .EventFundsFrozen({ transactionHash: tx });

    let callID;
    eventFundsFrozen.watch((err, res) => {
      console.log(res)
      if (!err && res.transactionHash === tx) {
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

    let eventWorker = biz.EventWorker();
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

    let eventFundsDeduct = biz.EventFundsDeduct();
    eventFundsDeduct.watch((err, res)=>{
      console.log(res)
      if (!err && res.args._callID.equals(callID)) {
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

    let eventNewCallback = consumer.newCallback();
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
