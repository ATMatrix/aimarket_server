import Web3 from 'web3';

import consumerArtifacts from '../../config/contracts/Consumer';
import attArtifacts from '../../config/contracts/ATT';
import bizArtifacts from '../../config/contracts/AIBusinessController';
import config from '../../config'

const {
  endpoint,
  contracts
} = config.blockchain;

const provider = new Web3.providers.HttpProvider(endpoint)
const web3 = new Web3(provider)

const consumerContract = web3.eth.contract(consumerArtifacts.abi);
const bizContract = web3.eth.contract(bizArtifacts.abi);
const attContract = web3.eth.contract(attArtifacts.abi);

export default {
  web3,
  biz: bizContract.at(contracts.biz),
  consumer: consumerContract.at(contracts.consumer),
  att: attContract.at(contracts.att),
}
