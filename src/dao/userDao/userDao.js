/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

import {addUser} from './addUser'
import {loginUser} from './loginUser'
import {checkExistUser} from './checkExistUser'


//userDao
export function userDao(module, method, params) {
    //code

    //promise
    console.log('userDao');
    //can not find dao
    if (!dao[method]) {
        console.log('userDao can not find dao[' + method + ']');
        return Promise.reject(
            'userDao can not find dao[' + method + ']'
        );
    }

    return dao[method](module, method, params);
}

//功能Dao--注册--
let dao = {};
dao.addUser=addUser;
dao.loginUser=loginUser;
dao.checkExistUser=checkExistUser;


































//getUserByAccountName
dao.getUserByAccountName = function (module, method, params) {
    //some code
    console.log('userDao-getUserByAccountName');
    if (params.accountName !== undefined) {
        var accountName = params.accountName;
        var AQL = `
                    For i in user
                        FILTER i.accountName == "${accountName}"
                            return UNSET(i,@tokill)
                  `;
        //promise
        return db.query(AQL, tokill).then(function (cursor) {
            return postInterceptor(cursor.all());
        });
    } else {
        throw 'params.accountName Undefined!Check it!';
    }
};

//getUserListByOffsetAndCount
dao.getUserListByOffsetAndCount = function (module, method, params) {
    //some code
    console.log('userDao-getUserListByOffsetAndCount');
    if (params.offset !== undefined && params.count !== undefined) {
        let bindVars = {};
        bindVars.tokill = ['_rev', '_key', 'invitationCode', 'token', 'password'];
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = ` 
                    LET userList = (For u in user
                                        SORT u.accountName DESC
                                        LIMIT @offset,@count
                                      return UNSET(u,@tokill)
                                      )
                    return {totalCount:LENGTH(user),userList:userList}
                  `;
        //promise
        return db.query(AQL, bindVars).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.offset or params.count Undefined!Check it!';
    }
};

//updateTokenByAccountName
dao.updateTokenByAccountName = function (module, method, params) {
    //some code
    console.log('userDao-updateTokenByAccountName');
    if (params.accountName && params.token) {
        let accountName = params.accountName;
        let token = params.token;
        var AQL = `
        For i in user
            FILTER i.accountName == "${accountName}"
            UPDATE i WITH {token:"${token}"} IN user
            return UNSET(NEW,@tokill)
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL, tokill)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.accountName or params.token Undefined!Check it!`;
    }
};

//updateGoldPointsByAccountName
dao.updateGoldPointsByAccountName = function (module, method, params) {
    //some code
    console.log('userDao-updateGoldPointsByAccountName');
    if (params.accountName && params.additionGoldPoints) {
        let accountName = params.accountName;
        let additionGoldPoints = params.additionGoldPoints;
        // var AQL = `
        // For i in user
        //     FILTER i.accountName == "${accountName}"
        //     UPDATE i WITH {goldPoints:i.goldPoints+${additionGoldPoints}} IN user
        //     return NEW
        // `;
        // console.log('AQL:' + AQL);
        // console.log(typeof AQL);
        //启用事务
        var action = String(function () {
            // This code will be executed inside ArangoDB!
            const db = require("@arangodb").db;
            return db._query(' For i in user    FILTER i.accountName == "' + params["accountName"] + '"    UPDATE i WITH {goldPoints:i.goldPoints+' + params["additionGoldPoints"] + '} IN user   return UNSET(NEW, "_key", "_id", "_rev") ').toArray();
        });

        return db.transaction({write: "user", allowImplicit: false}, action, {
                accountName: accountName,
                additionGoldPoints: additionGoldPoints
            })
            .then(result => {
                // result contains the return value of the action
                // console.log(Promise.resolve(result));
                return Promise.resolve(result);
            });
    } else {
        throw `params.accountName or params.newGoldPoints Undefined!Check it!`;
    }
};

//updateGoldPointsByAccountName
dao.updateGoldPointsByID = function (module, method, params) {
    //some code
    console.log('userDao-updateGoldPointsByAccountName');
    if (params.ID !== undefined && params.additionGoldPoints !== undefined) {
        let ID = params.ID;
        let additionGoldPoints = params.additionGoldPoints;
        // var AQL = `
        // For i in user
        //     FILTER i._id == "${accountName}"
        //     UPDATE i WITH {goldPoints:i.goldPoints+${additionGoldPoints}} IN user
        //     return NEW
        // `;
        // console.log('AQL:' + AQL);
        // console.log(typeof AQL);
        //启用事务
        var action = String(function () {
            // This code will be executed inside ArangoDB!
            const db = require("@arangodb").db;
            return db._query(' For i in user    FILTER i._id == "' + params["ID"] + '"    UPDATE i WITH {goldPoints:i.goldPoints+' + params["additionGoldPoints"] + '} IN user   return UNSET(NEW, "_key", "_id", "_rev") ').toArray();
        });

        return db.transaction({write: "user", allowImplicit: false}, action, {
                ID: ID,
                additionGoldPoints: additionGoldPoints
            })
            .then(result => {
                // result contains the return value of the action
                // console.log(Promise.resolve(result));
                return Promise.resolve(result);
            });
    } else {
        throw `params.ID or params.newGoldPoints Undefined!Check it!`;
    }
};

//updateGoldPointsByGainBonusRecord
dao.updateGoldPointsByGainBonusRecordList = function (module, method, params) {
    //some code
    console.log('userDao-updateGoldPointsByGainBonusRecordList');
    if (params.gainBonusRecordList) {
        let gainBonusRecordList = JSON.stringify(params.gainBonusRecordList);
        //启用事务
        var action = String(function () {
            // This code will be executed inside ArangoDB!
            const db = require("@arangodb").db;
            return db._query('For i in ' + params["gainBonusRecordList"] + '    For j in user    FILTER j.accountName == i.accountName    UPDATE j WITH {goldPoints:j.goldPoints+i.gainBonusSum} IN user   return UNSET(NEW, "_key", "_id", "_rev") ').toArray();
        });

        return db.transaction({write: "user", allowImplicit: false}, action, {gainBonusRecordList: gainBonusRecordList})
            .then(result => {
                // result contains the return value of the action
                // console.log(Promise.resolve(result));
                return Promise.resolve(result);
            });
    } else {
        throw `params.gainBonusRecordList Undefined!Check it!`;
    }
};

//功能Dao---end---
