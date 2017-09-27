/**
 * Created by zhubg on 2017/4/17.
 */
   
'use strict';

//口令
export class Token {
    constructor(token) {
        this.token = token;
    }
}

//Message
export class Message {
    constructor(type,code,content) {
        this.type = type;
        this.code = code;
        this.content = content;
    }
}

//Report
export class Report {
    constructor(reportType,flag,affix) {
        this.reportType = reportType;
        this.flag = flag;
        this.affix = affix;
    }
}

//用户信息列表
export class UserList {
    constructor(totalCount,userList,pageInfo) {
        this.totalCount = totalCount;
        this.userList = userList;
        this.pageInfo = pageInfo;
    }
}

//分页信息
export class PageInfo {
    constructor(endCursor,hasNextPage) {
        this.endCursor = endCursor;
        this.hasNextPage = hasNextPage;
    }
}