const {
  TokenFree,
  TokenTimes,
  TokenInterval,
  TokenOther
} = require('./raiden/token')

const redis = require("redis");
const redisConfig = {
  host:'redis',
  port:'6379'
}


import {baseDao} from '../dao/baseDao';

const client = redis.createClient(redisConfig)

client.on("error", function (err) {
  console.log("Error " + err);
});

client.on("connect", async () => {
  await getBillInfo(client);
  // let xiaoi = Buffer.from('XIAO_I', 'utf8').toString("hex")
  // let o = {
  //   "AI_NAME": "XIAO_I", // NOTE: key and value will be coerced to strings
  //   "AI_BILLING_TYPE": "1",
  //   "AI_ARG0": "1",
  //   "AI_ARG1": "1"
  // }
  // client.hmset(xiaoi, o);
  // client.hgetall(xiaoi, redis.print)
  // const consumer_address = '0x00eb5ca24922a29e25e748025c28e8a654339aea';
  // let token = new TokenFree();
  // client.set(consumer_address, JSON.stringify(token));
  // client.get(consumer_address, (e, o) => {
  //   console.log(o)
  // });

  
  // this key will expire after 10 seconds
  // client.set('key', JSON.stringify(o), 'EX', 10);
  // client.get('key', function(e,o){
  //   console.log(o)
  // })
});

async function getBillInfo(client) {
  let obj = await baseDao('aiDao', 'getAiList');
  for (let o of obj ) {
    let hex = Buffer.from(o.AI_NAME_EN_SHORT, 'utf8').toString("hex");
    let aiInfo = Object.assign({}, {
      "AI_NAME": o.AI_NAME_EN_SHORT,
      "AI_BILLING_TYPE": o.AI_BILLING_TYPE,
      "AI_ARG0": o.AI_ARG0,
      "AI_ARG1": o.AI_ARG1
    })
    client.hmset(hex, aiInfo);
    client.hgetall(hex, (e, r) => {
      console.log(r)
    })  
  }
}


module.exports = client;
