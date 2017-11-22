/**
 * Created by 莫西干拳王 on 2017/11/22.
 */

'use strict';

import {Message} from '../../objects';
import {baseDao} from '../../../dao/baseDao';


export async function getAiList() {
    try {
        let params = {};
        //访问数据库Dao
        let getAddrObj = await baseDao('aiDao', 'getAiList', params);
        console.log(getAddrObj);
        let content = JSON.stringify(getAddrObj);
        let type = "getAiList";
        let code = "600001";
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400001", err);
    }
}