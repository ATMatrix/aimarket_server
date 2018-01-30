const blockchain = require('./blockchain.json')
const database = require('./database.json')

let ENV = process.env.NODE_ENV

if (!ENV) {
  console.log('NODE_ENV not provided, use "development" as default.')
  ENV = 'development'
}

let blockchainConf = blockchain[ENV]
let databaseConf = database[ENV]

console.log("ENV: ",ENV)

function isEmpty(obj) {
  return !obj
    || Object.getOwnPropertyNames(obj).length === 0
}

if (isEmpty(blockchainConf) || isEmpty(databaseConf)) {
  console.log('Config empty for NODE_ENV "' + ENV + '", use "development" as default.')
  blockchainConf = blockchain['development']
  databaseConf = database['development']
}

module.exports = {
  blockchain: blockchainConf,
  database: databaseConf,
}
