'use strict';

import contractUtil from '../../../util/contracts.js'
import config from '../../../util/config'
// import sendTx from './sendTx'
// import rp from 'request-promise'

const {
  endpoint,
  account,
  cost,
  gas,
  contracts,
} = config.blockchain

const {
  web3,
  biz,
  consumer,
  att
} = contractUtil



module.exports.callAI = async (socket, msg) => {
  try {
    console.log('==============msg==============')
    console.log(msg);

    const callConf = {
      // nonce: 1048576,
      from: account.address,
      // gasPrice:  0.02e12,
      gas,
    }
    console.log('============account=============')
    console.log(account)

    web3.personal.unlockAccount(account.address, account.password)

    const a = await att
      .balanceOf(account.address, callConf);
    console.log('============balance============')
    console.log(a);

    await att
      .approve(contracts.bill, 1000000, callConf);
    // await sendTx('att', 'approve', [contracts.bill, 1000000])

    const b = await att
      .allowance(account.address, contracts.bill, callConf);
    // const b = await sendTx('att', 'allowance', [contracts.bill, 1000000])
    console.log('===========allowance===========')
    console.log(b)

    const aiID = msg.aiID;
    const args = JSON.stringify(msg.args)
    const tx = await consumer
      .callAI(aiID, args, callConf);
    console.log('============callAI=============')
    console.log(tx)

    socket.emit('message', {
      stage : "BlockChain",
      err:'',
      res:'',
    })
    // const tx = await sendTx('consumer', 'callAI', [aiID, args])

    const eventFundsFrozen = biz
      .EventFundsFrozen({ transactionHash: tx });

    let callID;
    eventFundsFrozen.watch((err, res) => {
      console.log('===========frozenFunds============')
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
      console.log('============worker=============')
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
      console.log('===========deductFunds============')
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
      console.log('=============result===============')
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
