/**
 * Created by zhubg on 2017/9/26.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAiList = getAiList;

var _objects = require('../../objects');

var _baseDao = require('../../../dao/baseDao');

async function getAiList() {
    try {
        if (arguments[1].token === '648d4007ca17944139946d96dcd016056148a19c89007b88db3a83a396aa') {
            var params = {};
            params.offset = arguments[1].offset;
            params.count = arguments[1].count;
            //访问数据库Dao
            var obj = await (0, _baseDao.baseDao)('vedioDao', 'getVedioListByOffsetAndCount', params);
            if (arguments[1].offset >= obj[0].totalCount) {
                return new _objects.Message("warn", "300001", "offset out of totalCount range!");
            } else {
                var totalCount = obj[0].totalCount;
                var vedioList = obj[0].vedioList;
                var endCursor = arguments[1].offset + arguments[1].count < obj[0].totalCount ? arguments[1].offset + arguments[1].count : obj[0].totalCount;
                var hasNextPage = endCursor < obj[0].totalCount ? true : false;
                var pageInfo = new _objects.PageInfo(endCursor, hasNextPage);
                var vedioListTemp = new VedioList(totalCount, vedioList, pageInfo);
                var type = "VedioList";
                var code = "600001";
                var content = JSON.stringify(vedioListTemp);
                return new _objects.Message(type, code, content);
            }
        } else {
            return new _objects.Message("error", "748", "your token is illegal,xxxx xxxx xxx!");
        }
    } catch (err) {
        console.log(err);
        return new _objects.Message("error", "400001", err);
    }
}