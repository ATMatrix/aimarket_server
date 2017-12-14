import Web3 from 'web3';

import config from '../../config'
import {
  default as truffleContract
} from 'truffle-contract'
import atn_artifacts from '../../config/contracts/ATN.json'
import uraiden_artifacts from '../../config/contracts/RaidenMicroTransferChannels.json'

const {
  endpoint
} = config.blockchain;

const provider = new Web3.providers.HttpProvider(endpoint)
const web3 = new Web3(provider)

const ATN = truffleContract(atn_artifacts);
const URAIDEN = truffleContract(uraiden_artifacts);
ATN.setProvider(web3.currentProvider);
URAIDEN.setProvider(web3.currentProvider);

const token = ATN.at("0xa649c2ba1fbf6984e934cea9dc6c7c2a7af379f7");
const uraiden = URAIDEN.at("0x1ea293cb5a28b2447383056b23ec79d768afa5c0");

export default {
  web3,
  token,
  uraiden,
}
