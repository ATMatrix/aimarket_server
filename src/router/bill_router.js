'use strict';

var express = require('express');
var billRouter = express.Router();

// middleware that is specific to this router
billRouter.use(function timeLog2(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

billRouter.get('/', function (req, res, next) {
  res.send('Birds home page');
});

export {billRouter};