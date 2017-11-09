import blockchain from './blockchain.json'
import database from './database.json'

const ENV = process.env.NODE_ENV

export default {
  blockchain: blockchain[ENV],
  database: database[ENV]
};
