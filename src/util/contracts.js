import Web3 from 'web3';

import consumerArtifacts from './config/contracts/Consumer';
import attArtifacts from './config/contracts/ATT';
import bizArtifacts from './config/contracts/AIBusinessController';

const {
  endpoint,
  contracts
} = require('./config').blockchain;

const provider = new Web3.providers.HttpProvider(endpoint)
const web3 = new Web3(provider)

const consumerContract = web3.eth.contract(consumerArtifacts);
const bizContract = web3.eth.contract(bizArtifacts);
const attContract = web3.eth.contract(attArtifacts);

export default {
  web3,
  biz: bizContract.at(contracts.biz),
  consumer: Contract.at(contracts.consumer),
  att: attContract.at(contracts.att),
}
