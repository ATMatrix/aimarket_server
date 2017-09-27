/**
 * Created by zhubg on 2017/9/26.
 */

'use strict';

import {rdsConnet, rdsConnection} from '../../util/database';

export default async function frontInterceptor() {
    //建立连接
    // await rdsConnet(rdsConnection);
    return new Promise((resolve, reject) => {
        // console.log(results);
        resolve();
    })
}