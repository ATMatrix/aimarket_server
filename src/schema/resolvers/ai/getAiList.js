/**
 * Created by zhubg on 2017/9/26.
 */

'use strict';

import {AiList, Message, PageInfo} from '../../objects';
import {baseDao} from '../../../dao/baseDao';


export async function getAiList() {
    try {
        if (arguments[1].token==='648d4007ca17944139946d96dcd016056148a19c89007b88db3a83a396aa'){
            let params = {};
            params.offset = arguments[1].offset;
            params.count = arguments[1].count;
            //访问数据库Dao
            let obj = await baseDao('vedioDao', 'getVedioListByOffsetAndCount', params);
            if (arguments[1].offset>=obj[0].totalCount){
                return new Message("warn", "300001", "offset out of totalCount range!");
            }else {
                let totalCount = obj[0].totalCount;
                let vedioList = obj[0].vedioList;
                let endCursor = (arguments[1].offset + arguments[1].count)<obj[0].totalCount?arguments[1].offset + arguments[1].count:obj[0].totalCount;
                let hasNextPage = endCursor < obj[0].totalCount ? true : false;
                let pageInfo = new PageInfo(endCursor, hasNextPage);
                let vedioListTemp = new VedioList(totalCount, vedioList, pageInfo);
                let type = "VedioList";
                let code = "600001";
                let content = JSON.stringify(vedioListTemp);
                return new Message(type, code, content);
            }
        }else {
            return new Message("error", "748", "your token is illegal,xxxx xxxx xxx!");
        }
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400001", err);
    }
}