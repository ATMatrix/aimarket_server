import Web3 from 'web3';

import config from '../../config'
import {
  default as truffleContract
} from 'truffle-contract'
import att_artifacts from '../../config/contracts/ERC223Token.json'
import uraiden_artifacts from '../../config/contracts/RaidenMicroTransferChannels.json'

const {
  endpoint
} = config.blockchain;

const provider = new Web3.providers.HttpProvider(endpoint)
const web3 = new Web3(provider)

// const ATT = web3.eth.contract(bizArtifacts.abi);
// const URAIDEN = web3.eth.contract(attArtifacts.abi);

const ATT = truffleContract(att_artifacts);
const URAIDEN = truffleContract(uraiden_artifacts);
ATT.setProvider(web3.currentProvider);
URAIDEN.setProvider(web3.currentProvider);

const token = ATT.at("0x2cbf599d9ba5189c8672452d0616df4a3fa9a5ce");
const uraiden = URAIDEN.at("0x882029bab0d8b6b8edc0990c3ab9c153f78f5e19");

export default {
  web3,
  token,
  uraiden,
}
