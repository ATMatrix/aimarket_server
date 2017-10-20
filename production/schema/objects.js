/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//口令

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = exports.Token = function Token(token) {
    _classCallCheck(this, Token);

    this.token = token;
};

//Message


var Message = exports.Message = function Message(type, code, content) {
    _classCallCheck(this, Message);

    this.type = type;
    this.code = code;
    this.content = content;
};

//Report


var Report = exports.Report = function Report(reportType, flag, affix) {
    _classCallCheck(this, Report);

    this.reportType = reportType;
    this.flag = flag;
    this.affix = affix;
};

//用户信息列表


var UserList = exports.UserList = function UserList(totalCount, userList, pageInfo) {
    _classCallCheck(this, UserList);

    this.totalCount = totalCount;
    this.userList = userList;
    this.pageInfo = pageInfo;
};

//分页信息


var PageInfo = exports.PageInfo = function PageInfo(endCursor, hasNextPage) {
    _classCallCheck(this, PageInfo);

    this.endCursor = endCursor;
    this.hasNextPage = hasNextPage;
};