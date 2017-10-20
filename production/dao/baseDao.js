/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.baseDao = baseDao;

var _userDao = require('./userDao/userDao');

var _frontInterceptor = require('./interceptor/frontInterceptor');

var _frontInterceptor2 = _interopRequireDefault(_frontInterceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//allDao注册
var dao = {};
// dao.lotteryRecordDao = lotteryRecordDao;
// dao.bettingRecordDao = bettingRecordDao;


//前置拦截器
dao.userDao = _userDao.userDao;

//baseDao
async function baseDao(module, method, params) {

    //frontInterceptor
    await (0, _frontInterceptor2.default)();

    //promise
    console.log('baseDao');

    //cant find dao
    if (!dao[module]) {
        console.log('baseDao can not find dao[' + module + ']');
        return Promise.reject('baseDao can not find dao[' + module + ']');
    }

    return dao[module](module, method, params);
}