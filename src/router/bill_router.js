'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var billRouter = express.Router();
const {
  getAiList,
  getAiInfo,
  callAI,
  getPrice
} = require('../restful/bill/aiResolve')

// middleware that is specific to this router
billRouter.use(function timeLog2(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

billRouter.use(jsonParser);

billRouter.get('/api/v1/getAiList', async (req, res) => {
  let objs = await getAiList(req.query.tags);
  let result = [];
  for (let o of objs) {
    let aiInfo = Object.assign({}, {
      "id": o.AI_ID,
      "type": o.AI_TECHNICAL_TYPE,
      "name": o.AI_NAME_EN_SHORT,
      "bill_type": o.AI_BILLING_TYPE,
      "arg0": o.AI_ARG0,
      "arg1": o.AI_ARG1
    })
    result.push(aiInfo);
  }
  res.send(result)
});

billRouter.get('/api/v1/getAiInfo', async (req, res) => {
  let objs = await getAiInfo(req.query.id);
  let result;
  for (let o of objs) {
    let aiInfo = Object.assign({}, {
      "id": o.AI_ID,
      "type": o.AI_TECHNICAL_TYPE,
      "name": o.AI_NAME_EN_SHORT,
      "bill_type": o.AI_BILLING_TYPE,
      "arg0": o.AI_ARG0,
      "arg1": o.AI_ARG1
    })
    result = aiInfo;
  }
  console.log(result)
  res.send(result)
});

billRouter.post('/api/v1/callAI', async (req, res) => {
  let params = req.body;
  let result = await callAI(params);
  console.log(result)
  res.send(result);
})

billRouter.get('/api/v1/getPrice', async (req, res) => {
  let params = req.query;
  let result = await getPrice(params);
  res.send(result)
})

export {
  billRouter
};