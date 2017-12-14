'use strict';

import {Message} from '../../objects';
import {baseDao} from '../../../dao/baseDao';


export async function getAiDetails() {
    try {
        const id = JSON.parse(arguments[1].id)
        //访问数据库Dao
        let getDetailsObj = await baseDao('aiDao', 'getAiDetails', id);
        let content = JSON.stringify(getDetailsObj);
        let type = "getAiDetails";
        let code = "600001";
        return new Message(type, code, content);
    }
    catch (err) {
        console.log(err);
        return new Message("error", "400001", err);
    }
}
