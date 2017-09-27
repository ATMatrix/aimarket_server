/**
 * Created by zhubg on 2017/3/6.
 */

'use strict';

import {makeExecutableSchema,addResolveFunctionsToSchema} from 'graphql-tools';
import {typeDefs} from './typeDefs';
import {resolvers} from './resolvers/resolvers';

// Use graphql-tools to make a GraphQL.js schema
export const schema = makeExecutableSchema({typeDefs, resolvers});
