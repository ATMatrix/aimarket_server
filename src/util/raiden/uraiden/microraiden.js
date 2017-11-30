'use strict';

import contractUtil from '../../truffleContract'
import config from '../../../../config'
import { error } from 'util';

const {
  endpoint,
  account,
  cost,
  gas,
  contracts,
} = config.blockchain
const {
  web3,
  token,
  uraiden
} = contractUtil

const callConf = {
  from: account.address,
  gas,
}

class MicroRaiden {

  constructor(_privkey, _password) {
    this.privkey = _privkey;
    this.password = _password;
    this.web3 = web3;
    this.token = token;
    this.contract = uraiden;
  }

  async openChannel(receiver_address, deposit) {
    this.web3.personal.unlockAccount(account.address, account.password);
    let balance = await this.token.balanceOf(account.address, callConf);
    if(balance < deposit) throw 'more balance requeired';
    let tx;
    if(typeof this.token.transfer['address,uint256,bytes'] === 'function'){
      tx = await this.token.transfer["address,uint256,bytes"](
        this.contract.address,
        deposit,
        receiver_address,
        callConf
      );
    } else {
      await this.token.approve(
        this.contract.address,
        deposit,
        callConf
      );
      tx = await this.contract.createChannelERC20(
        receiver_address,
        deposit,
        callConf
      );
    }
    return this.web3.eth.getTransactionReceipt(tx, async (err, receipt) => {
      console.log("receipt",receipt)
      let info = await this.contract.getChannelInfo(
        account.address,
        receiver_address,
        receipt.blockNumber,
        callConf
      );
      console.log(info);
      return info;
    })
  }

  topUpChannel(deposit, callback) {
    
  }

  closeChannel(receiverSig, callback) {
    
  }

  settleChannel(callback) {
    
  }

  signMessage(msg, callback) {
    
  }

  signBalance(newBalance, callback) {
    
  }

  incrementBalanceAndSign(amount, callback) {
    
  }
}

module.exports = MicroRaiden;


const rdn = new MicroRaiden();
rdn.openChannel("0x9765E2D8467334198b402e4D4551Dd49e63327Ec",1);