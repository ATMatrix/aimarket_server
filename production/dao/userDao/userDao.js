/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userDao = userDao;

var _addUser = require('./addUser');

var _loginUser = require('./loginUser');

var _checkExistUser = require('./checkExistUser');

//userDao
function userDao(module, method, params) {
    //code

    //promise
    console.log('userDao');
    //can not find dao
    if (!dao[method]) {
        console.log('userDao can not find dao[' + method + ']');
        return Promise.reject('userDao can not find dao[' + method + ']');
    }

    return dao[method](module, method, params);
}

//功能Dao--注册--
var dao = {};
dao.addUser = _addUser.addUser;
dao.loginUser = _loginUser.loginUser;
dao.checkExistUser = _checkExistUser.checkExistUser;

//getUserByAccountName
dao.getUserByAccountName = function (module, method, params) {
    //some code
    console.log('userDao-getUserByAccountName');
    if (params.accountName !== undefined) {
        var accountName = params.accountName;
        var AQL = '\n                    For i in user\n                        FILTER i.accountName == "' + accountName + '"\n                            return UNSET(i,@tokill)\n                  ';
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
        var bindVars = {};
        bindVars.tokill = ['_rev', '_key', 'invitationCode', 'token', 'password'];
        bindVars.offset = params.offset;
        bindVars.count = params.count;
        var AQL = ' \n                    LET userList = (For u in user\n                                        SORT u.accountName DESC\n                                        LIMIT @offset,@count\n                                      return UNSET(u,@tokill)\n                                      )\n                    return {totalCount:LENGTH(user),userList:userList}\n                  ';
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
        var accountName = params.accountName;
        var token = params.token;
        var AQL = '\n        For i in user\n            FILTER i.accountName == "' + accountName + '"\n            UPDATE i WITH {token:"' + token + '"} IN user\n            return UNSET(NEW,@tokill)\n        ';
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL, tokill).then(function (cursor) {
            return cursor.all();
        });
    } else {
        throw 'params.accountName or params.token Undefined!Check it!';
    }
};

//updateGoldPointsByAccountName
dao.updateGoldPointsByAccountName = function (module, method, params) {
    //some code
    console.log('userDao-updateGoldPointsByAccountName');
    if (params.accountName && params.additionGoldPoints) {
        var accountName = params.accountName;
        var additionGoldPoints = params.additionGoldPoints;
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
            var db = require("@arangodb").db;
            return db._query(' For i in user    FILTER i.accountName == "' + params["accountName"] + '"    UPDATE i WITH {goldPoints:i.goldPoints+' + params["additionGoldPoints"] + '} IN user   return UNSET(NEW, "_key", "_id", "_rev") ').toArray();
        });

        return db.transaction({ write: "user", allowImplicit: false }, action, {
            accountName: accountName,
            additionGoldPoints: additionGoldPoints
        }).then(function (result) {
            // result contains the return value of the action
            // console.log(Promise.resolve(result));
            return Promise.resolve(result);
        });
    } else {
        throw 'params.accountName or params.newGoldPoints Undefined!Check it!';
    }
};

//updateGoldPointsByAccountName
dao.updateGoldPointsByID = function (module, method, params) {
    //some code
    console.log('userDao-updateGoldPointsByAccountName');
    if (params.ID !== undefined && params.additionGoldPoints !== undefined) {
        var ID = params.ID;
        var additionGoldPoints = params.additionGoldPoints;
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
            var db = require("@arangodb").db;
            return db._query(' For i in user    FILTER i._id == "' + params["ID"] + '"    UPDATE i WITH {goldPoints:i.goldPoints+' + params["additionGoldPoints"] + '} IN user   return UNSET(NEW, "_key", "_id", "_rev") ').toArray();
        });

        return db.transaction({ write: "user", allowImplicit: false }, action, {
            ID: ID,
            additionGoldPoints: additionGoldPoints
        }).then(function (result) {
            // result contains the return value of the action
            // console.log(Promise.resolve(result));
            return Promise.resolve(result);
        });
    } else {
        throw 'params.ID or params.newGoldPoints Undefined!Check it!';
    }
};

//updateGoldPointsByGainBonusRecord
dao.updateGoldPointsByGainBonusRecordList = function (module, method, params) {
    //some code
    console.log('userDao-updateGoldPointsByGainBonusRecordList');
    if (params.gainBonusRecordList) {
        var gainBonusRecordList = JSON.stringify(params.gainBonusRecordList);
        //启用事务
        var action = String(function () {
            // This code will be executed inside ArangoDB!
            var db = require("@arangodb").db;
            return db._query('For i in ' + params["gainBonusRecordList"] + '    For j in user    FILTER j.accountName == i.accountName    UPDATE j WITH {goldPoints:j.goldPoints+i.gainBonusSum} IN user   return UNSET(NEW, "_key", "_id", "_rev") ').toArray();
        });

        return db.transaction({ write: "user", allowImplicit: false }, action, { gainBonusRecordList: gainBonusRecordList }).then(function (result) {
            // result contains the return value of the action
            // console.log(Promise.resolve(result));
            return Promise.resolve(result);
        });
    } else {
        throw 'params.gainBonusRecordList Undefined!Check it!';
    }
};

//功能Dao---end---