/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

export const typeDefs = `

#分页消息
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

#输入类型关键字input

input User {
    username:String!
    email:String!
    password:String!
}

type Query {
    getToken(id:ID!): Message!
    addUser(user:User!): Message!
    callAI(params:String!): Message!
    loginUser(user:User!):Message!
    setAttAddress(params:String!):Message!
    getAttAddress(params:String!):Message!
    getAiList(params:String):Message!
}

schema {
  query: Query
}

`;

// getLotteryRecordList(offset: Int!,count: Int!): Message!
//     getBettingRecordList(offset: Int!,count: Int!): Message!
//     getUserList(offset: Int!,count: Int!): Message!
//     getPointAddAndSubtractRecordList(offset: Int!,count: Int!): Message!
//     insertPointAddAndSubtractRecord(additionPoints: Int!,user_fid: String!): Message!
//     updateApprovalFlagByID(approvalFlag: String!,ID: String!,additionPoints: Int!): Message!
