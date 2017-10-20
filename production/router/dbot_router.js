/**
 * Created by zhubg on 2017/10/9.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var express = require('express');
var dbotRouter = express.Router();

// middleware that is specific to this router
dbotRouter.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

dbotRouter.get('/', function (req, res, next) {
  res.send('Birds home page');
});

// define the home page route
dbotRouter.get('/orc', function (req, res, next) {
  var AipOcrClient = require("baidu-aip-sdk").ocr;
  // 设置APPID/AK/SK
  var APP_ID = "10216389";
  var API_KEY = "W9EKSl5xwhEpEI7w5swK1ugb";
  var SECRET_KEY = "Hwfn4bprEiUQqpv4dLUclxWSv6yA7qNd";

  var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

  client.generalUrl('http://img2.3lian.com/2014/f6/176/d/89.jpg', { detect_direction: true }).then(function (result) {
    res.send(JSON.stringify(result));
  });
});

exports.dbotRouter = dbotRouter;