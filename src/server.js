/**
 * Created by zhubg on 2017/4/14.
 */

'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from'body-parser';
import {graphqlExpress} from 'graphql-server-express';
import {schema} from'./schema/schema';
import path from 'path';
import compression from 'compression';

const app = express();
app.use(compression());

app.use('/', express.static(path.join(__dirname, './public')));

const corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = true;
        callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
    },
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


//test
import fetch from 'node-fetch';

app.get('/tokentest', function (req, res, next) {
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(
            {
                "query": `query {
                              getToken(id:"1234") {
                                  code
                                  type
                                  content
                              }
                            }`
            }
        ),
        headers: {'Content-Type': 'application/json'}
    })
        .then(function (res) {
            return res.json();
        }).then(function (json) {
        console.log(json);
        res.send(json);
    });
});

app.get('/test1', function (req, res, next) {
    let Test_Query = `query  getLotteryRecordListFunc($additionPoints: Int!,$user_fid: String!,$approvalUser_fid: String!) {
                             insertPointAddAndSubtractRecord(additionPoints:$additionPoints,user_fid:$user_fid,approvalUser_fid:$approvalUser_fid) {
                                  code
                                  type
                                  content
                                }
                             }`;
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(
            {
                "query": Test_Query,
                "variables": {
                    "additionPoints": -200,
                    "user_fid": '10',
                    "approvalUser_fid": '20'
                }
            }
        ),
        headers: {'Content-Type': 'application/json'}
    })
        .then(function (res) {
            return res.json();
        }).then(function (json) {
        res.send(json);
    });
});

app.get('/adduser', function (req, res, next) {
    let user = {};
    user.username = 'username1';
    user.email = 'email1';
    user.password = 'password1';
    let GQL = `query  addUserFunc($user: User!) {
                             addUser(user:$user) {
                                  code
                                  type
                                  content
                                }
                             }`;
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(
            {
                query: GQL,
                variables: {
                    user: user
                }
            }
        ),
        headers: {'Content-Type': 'application/json'}
    })
        .then(function (res) {
            return res.json();
        }).then(function (json) {
        console.log("http_json");
        console.log(json);
        res.send(json);
    });
});

app.get('/callai', function (req, res, next) {
    let params = {};
    params.type = 'xiaoi';
    params.question = '今天上海的天气';
    let GQL = `query  callAIFunc($params: String!) {
                             callAI(params:$params) {
                                  code
                                  type
                                  content
                                }
                             }`;
    fetch('http://127.0.0.1:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(
          {
              query: GQL,
              variables: {
                  params: JSON.stringify(params)
              }
          }
        ),
        headers: {'Content-Type': 'application/json'}
    })
      .then(function (res) {
          return res.json();
      }).then(function (json) {
        console.log("callai_json");
        console.log(json);
        res.send(json);
    });
});

app.get('/setAttAddress', function (req, res, next) {
    let user = {};
    user.username = 'abc';
    user.address = '0x20';
    let GQL = `query  setAttAddressFunc($params: String!) {
                    setAttAddress(params:$params) {
                                  code
                                  type
                                  content
                                }
                             }`;
    fetch('http://127.0.0.1:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(
          {
              query: GQL,
              variables: {
                  params: JSON.stringify({user:user})
              }
          }
        ),
        headers: {'Content-Type': 'application/json'}
    })
      .then(function (res) {
          return res.json();
      }).then(function (json) {
        console.log("setAttAddress");
        console.log(json);
        res.send(json);
    });
});

app.get('/getAttAddress', function (req, res, next) {
    let user = {};
    user.username = 'abc';
    let GQL = `query  getAttAddressFunc($params: String!) {
                    getAttAddress(params:$params) {
                                  code
                                  type
                                  content
                                }
                             }`;
    fetch('http://127.0.0.1:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(
          {
              query: GQL,
              variables: {
                  params: JSON.stringify({user:user})
              }
          }
        ),
        headers: {'Content-Type': 'application/json'}
    })
      .then(function (res) {
          return res.json();
      }).then(function (json) {
        console.log("getAttAddress");
        console.log(json);
        res.send(json);
    });
});

app.get('/transfer', (req, res, next) => {
    let GQL = `query  transferFunc($params: String!) {
        transfer(params:$params) {
             code
             type
             content
           }
        }`;
    fetch('http://127.0.0.1:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(
          {
              query: GQL,
              variables: {
                  params: ""
              }
          }
        ),
        headers: {'Content-Type': 'application/json'}
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
      console.log("transfer");
      console.log(json);
      res.send(json);
  });
        
})

app.get('/getAiList', function (req, res, next) {
    let user = {};
    user.username = 'abc';
    let GQL = `query  getAiListFunc($params: String) {
                    getAiList(params:$params) {
                                  code
                                  type
                                  content
                                }
                             }`;
    fetch('http://127.0.0.1:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(
          {
              query: GQL,
              variables: {
                  params: ""
              }
          }
        ),
        headers: {'Content-Type': 'application/json'}
    })
      .then(function (res) {
          return res.json();
      }).then(function (json) {
        console.log("getAiList");
        console.log(json);
        res.send(json);
    });
});

import {dbotRouter} from './router/index';

app.use('/dbot', dbotRouter);

app.use('/graphql', cors(corsOptions), bodyParser.json(), graphqlExpress({schema: schema}));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//socket.io
var server = require('http').createServer(app);
const webServer = server.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});

const ss = require('./socketServer');
ss.socketServer(webServer);
