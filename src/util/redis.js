import {baseDao} from '../dao/baseDao';
import config from '../../config'
const redisConfig = config.redis

var client;
let ENV = process.env.NODE_ENV
if (ENV == 'production') {
  const Redis = require('ioredis');
  client = new Redis({
    sentinels: [redisConfig],
    name: 'mymaster'
  });
} else {
  const redis = require("redis");
  client = redis.createClient(redisConfig)
}

client.on("error", function (err) {
  console.log("Error " + err);
});

client.on("connect", async () => {
  console.log('rdsConnet')
  await getBillInfo(client);
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
