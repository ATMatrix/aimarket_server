/**
 * Created by zhubg on 2017/3/6.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphqlTools = require('graphql-tools');

var _typeDefs = require('./typeDefs');

var _resolvers = require('./resolvers/resolvers');

// Use graphql-tools to make a GraphQL.js schema
var schema = exports.schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: _typeDefs.typeDefs, resolvers: _resolvers.resolvers });