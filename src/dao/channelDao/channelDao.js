/**
 * Created by 莫西干拳王 on 2017/1/22.
 */

'use strict';

import {getChannel} from './getChannel'
import {openChannel} from './openChannel'
import {topUpChannel} from './topUpChannel'
import {closeChannel} from './closeChannel'
import {setChannel} from './setChannel'

//aiDao
export function channelDao(module, method, params) {
    //code

    //promise
    console.log('channelDao');
    //can not find dao
    if (!dao[method]) {
        console.log('channelDao can not find dao[' + method + ']');
        return Promise.reject(
            'channelDao can not find dao[' + method + ']'
        );
    }

    return dao[method](module, method, params);
}

//功能Dao--注册--
let dao = {};
dao.getChannel=getChannel;
dao.openChannel=openChannel;
dao.topUpChannel=topUpChannel;
dao.closeChannel=closeChannel;
dao.setChannel=setChannel;