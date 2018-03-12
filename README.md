# AI Market (Server) - First AI Marketplace Powered by Blockchain
The code is in develop branch. This code is AI Market server project which provides GraphQL/REST endpoint and WEBSocket endpoint for AI Market web. AI Market web project is [here](https://github.com/ATNIO/aimarket_web).

## Getting Started
The following instructions overview the process of getting the code, building it, running in localhost.

### Prerequisites

```
brew install node
```

### Docker


Clone project

```
git clone git@github.com:ATNIO/aimarket_server.git
```

Run

```
docker-compose build

docker-compose up
```

Logs

```
docker-compose logs -f
```

Stop

```
docker-compose stop
```

### Installing

Clone project

```
git clone git@github.com:ATNIO/aimarket_server.git
```

Install dependencies
```
npm i
```

### Building 
```
npm run build
```

### Running
```
npm run start
``` 

Open [http://localhost:4000/tokentest](http://localhost:4000/tokentest)

## Framework

Using [Express](http://expressjs.com) as our web framework, 🌍 [GraphQL](http://graphql.org) server for Express based on [apollo-server](https://www.apollographql.com),use [SOCKET.IO](https://socket.io) as WebSocket, use [mysqljs/mysql](https://github.com/mysqljs/mysql) as database dao. 

### Data Flow
<img src="https://demo.atn.io/static/aimarket_server.jpg" width="807" />

Using three important components, including:

* Express
* GQL Schema
* Database DAO

## Express

### REST endpoint

#### [Express:Router](http://expressjs.com/zh-cn/4x/api.html#Router)

A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.

The top-level express object has a Router() method that creates a new router object.

Once you’ve created a router object, you can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application. For example:

***dbot_router*.js** :

```javascript
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

export {dbotRouter};
```
You can then use a router for a particular root URL in this way separating your routes into files or even mini-apps.

***server*.js** :

`app.use('/dbot', dbotRouter);`


### GraphQL endpoint

***server*.js** :

```javascript
app.use('/graphql', cors(corsOptions), bodyParser.json(), graphqlExpress({schema: schema}));
```

### WebSocket endpoint

***server*.js** :

```javascript
//socket.io
var server = require('http').createServer(app);
const webServer = server.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});

const ss = require('./socketServer');
ss.socketServer(webServer);
```

## GQL Schema

### [GraphQL:Schemas and Types](http://graphql.org/learn/schema/#type-system)

The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:

***typeDefs*.js** :

```javascript
export const typeDefs = `

type PageInfo {
    endCursor: Int!
    hasNextPage: Boolean!
}

#Message
type Message {
    type: String!
    code: String!
    content: String!
}

input User {
    username:String!
    email:String!
    password:String!
}

type Query {
    getToken(id:ID!): Message!
    addUser(user:User!): Message!
    callAI(params:String!): Message!
}

schema {
  query: Query
}

`;
```

### [GraphQL:Root fields & resolvers](http://graphql.org/learn/execution/#root-fields-resolvers)

At the top level of every GraphQL server is a type that represents all of the possible entry points into the GraphQL API, it's often called the Root type or the Query type.

***resolvers*.js** :

```javascript
import {getToken} from './getToken';
import {loginUser} from './user/loginUser';
import {addUser} from './user/addUser';
import {callAI} from './ai/callAI';

export const resolvers = {
  Query: {
    getToken,
    loginUser,
    addUser,
    callAI
  }
};
```

***getToken*.js** use ES7 async function:

```javascript
import {Token,Message} from '../objects';

export async function getToken() {
    let token = require('crypto').randomBytes(10).toString('hex');
    let message = new Message();
    message.type = "info";
    message.code = "00001";
    message.content = "this is a message test";
    console.log("token_test");
    console.log(token);
    return message;
}
```

***ps* :** Resolvers are also used by REST endpoints and WebSocket endpoints.

## Database Dao

### Business Dao

Business Dao is the base unit cotains functions which to excute SQL statement on database. before using a business Dao you need to register it on business dispatcher. For example:

1. business dispatcher

***userDao*.js** :

```javascript
import {addUser} from './addUser'
import {loginUser} from './loginUser'

//function Dao register
let dao = {};
dao.addUser=addUser;
dao.loginUser=loginUser;
```

2. base dispatcher
 
***baseDao*.js** :

```javascript
import {userDao} from './userDao/userDao';
import {aiDao} from './aiDao/aiDao';

//business dispatcher register
var dao = {};
dao.userDao = userDao;
dao.aiDao = aiDao;
```

***addUser*.js** :

```javascript
//DB
import {pool} from '../../util/database';

//addUser
export function addUser(module, method, params) {
    if (params.user !== undefined) {
        let username = params.user.username;
        let email = params.user.email;
        let password = params.user.password;
        let SQL = `INSERT INTO t_user(USER_NAME,USER_EMAIL,USER_PASSWORD) VALUES (?,?,?)`;
        let bindVars = [username, email, password];
        //promise
        return new Promise((resolve, reject) => {
            pool.query(SQL, bindVars, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                resolve(postInterceptor(results));
            });
        });
    } else {
        throw 'params.user Undefined!Check it!';
    }
}
```

## References
- [Express](http://expressjs.com)
- 🌍[GraphQL](http://graphql.org)
- [apollo-server](https://www.apollographql.com)
- [SOCKET.IO](https://socket.io)
- [mysqljs/mysql](https://github.com/mysqljs/mysql)
