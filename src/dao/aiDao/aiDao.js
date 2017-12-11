/**
 * Created by 莫西干拳王 on 2017/11/22.
 */

'use strict';

import {getAiList} from './getAiList'
import {getAiDetails} from './getAiDetails'


//aiDao
export function aiDao(module, method, params) {
    //code

    //promise
    console.log('aiDao');
    //can not find dao
    if (!dao[method]) {
        console.log('aiDao can not find dao[' + method + ']');
        return Promise.reject(
            'aiDao can not find dao[' + method + ']'
        );
    }

    return dao[method](module, method, params);
}

//功能Dao--注册--
let dao = {};
dao.getAiList=getAiList;
dao.getAiDetails = getAiDetails
