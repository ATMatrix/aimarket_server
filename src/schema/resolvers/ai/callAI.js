/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';
import { Message } from '../../objects';
var crypto = require('crypto');
var rp = require('request-promise');

//web3
import fs from 'fs';
import config from '../../../../config'
import contracts  from '../../../util/contracts'

const {
  endpoint,
  account,
  cost,
  gasLimit,
} = config.blockchain;

const {
  web3,
  consumer,
  att,
} = contracts


export async function callAI() {
  try {
    let options;
    let result;
    let app_key;
    let type = "callAI";
    let code = "900001";
    let content = "";
    let params = JSON.parse(arguments[1].params);

    //baidu ORC
    if (params.type === "baiduOcr") {
      const AipOcrClient = require("baidu-aip-sdk").ocr;

      const APP_ID = "10216389";
      const API_KEY = "W9EKSl5xwhEpEI7w5swK1ugb";
      const SECRET_KEY = "Hwfn4bprEiUQqpv4dLUclxWSv6yA7qNd";

      const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

      const obj = await client
        .generalUrl(params.url, {
          detect_direction: true,
        });
      content = JSON.stringify(obj);

      return new Message(type, code, content);

      //baiduVoice
    } else if (params.type === "baiduVoice") {
      const AipSpeechClient = require("baidu-aip-sdk").speech;
      const fs = require('fs');

      const APP_ID = "10266139";
      const API_KEY = "yZrc3nNz6qC5AwuCUFGem88P";
      const SECRET_KEY = "CRnLKOuMUgGXrqMP3AQFIMBMBxg0ZQCO";

      const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

      const result = await client
        .text2audio(params.word, {
          spd: 0,
          per: 4,
        });

      const flag = await new Promise((resolve, reject) => {
        fs.writeFile('./public/test.mp3', result.data, (err) => {
          if (err) reject(false);
          resolve(true);
        });
      });

      if (flag) {
        return new Message(type, code, JSON.stringify({message:"baiduVoice_success"}));
      }
      return new Message(type, code, JSON.stringify({message:"baiduVoice_fail"}));

      //xiao i robot
    } else if (params.type === "xiaoi") {
      const callConf = {
        from: account.address,
        gas: gasLimit
      }
      const args = JSON.stringify({
        question: params.question
      })

      await att.balanceOf(account.address, callConf);
      await att.approve(billAddr, 1000000, callConf);
      await att.allowance(account.address, billAddr, callConf);
      await consumer.callAI('xiaoi', args, callConf);


      const eventNewCallback = xiaoi.newCallback();
      result = await new Promise((resolve, reject) => {
        eventNewCallback.watch((err, res) => {
          if (!err){
            resolve(err);
          } else {
            resolve(res);
          }
          eventNewCallback.stopWatching();
        });
      });

      content = JSON.stringify({
        answer: result.args._result
      })
      return new Message(type, code, content);

      //aliyun AI Market
    } else if (params.type === "aliface") {

      var request = require("request");

      options = {
        method: 'POST',
        url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
        headers: {
          'postman-token': '3b9c2397-78b4-798d-3bbb-1eeca61bb2c4',
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
          api_key: 'WqiDdteZP4nlAEl_tX0q6K2C4WHUqm1Q',
          api_secret: '3bWrbJux_Kj3A7hArYKpOFU3hzYIIlN9',
          // image_base64: '',
          image_url: params.url,
          // image_file: '',//二进制文件，需要用post multipart/form-data的方式上传
          return_attributes: 'age,smiling,eyestatus,emotion,beauty'
        }
      };

      result = await rp(options).catch(function (err) {
        // Crawling failed or Cheerio choked...
        return err;
      });

      return new Message(type, code, result);

      //xunfei ai
    } else if (params.type === "xunfeiai") {

      var app_id = '59e9b4bb';
      app_key = '1e62889443f14a1998f35799058af5d1';
      var body = new Buffer(params.question).toString('base64');
      var http_body = 'text=' + body;
      var curTime = parseInt(Date.now() / 1000);
      var json = {"userid": "aaa", "scene": "main"};
      var param = new Buffer(JSON.stringify(json)).toString('base64');
      var b = app_key + curTime + param + http_body;
      var checkSum = crypto.createHash('md5').update(b).digest('hex');
      options = {
        method: 'POST',
        url: 'http://api.xfyun.cn/v1/aiui/v1/text_semantic',
        headers: {
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          accept: 'text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2',
          'x-checksum': checkSum,
          'x-appid': app_id,
          'x-param': param,
          'x-curtime': curTime
        },
        form: {text: body}
      };

      result = await rp(options);
      console.log(JSON.parse(result));
      if (JSON.parse(result).data && JSON.parse(result).data.answer && JSON.parse(result).desc === "成功") {
        content = JSON.stringify({answer: JSON.parse(result).data.answer.text});
      } else {
        content = JSON.stringify({error: "ai request fail"});
      }
      console.log();
      return new Message(type, code, content);

    } if (params.type === "censor") {
      let method = params.method;
      let image = params.image;
      const imageCensor = require('../api/imageCensor');
      content = await imageCensor({method, image});
      return new Message(type, code, JSON.stringify(content, null, 2));
    } if (params.type === "nlp") {
      let method = params.method;
      let text = params.text;
      const nlp = require('../api/nlp');
      content = await nlp({method, text});
      return new Message(type, code, JSON.stringify(content, null, 2));
    } else {
      return new Message("error", "400004", "Not found " + params.type);
    }

  }
  catch (err) {
    console.log(err);
    return new Message("error", "400001", err);
  }
}
