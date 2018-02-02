/**
 * Created by tyzhou on 2018/1/25.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {poolConnection} from '../../util/database';


//openChannel
export function setChannel(module, method, params) {
    //some code
    console.log('channelDao-setChannel', params);
    if (params !== undefined) {
        // let channel_key = params.channel_key;
        console.log("setChannel dao params: ", params);        
        let SQL = ` UPDATE t_uraiden_channel SET BALANCE = ?, REMAINING = ? WHERE BLOCK = ? and STATE = 'open'`;
        let bindVars = [params.balance, params.remaining, params.block];
        //promise
        return new Promise((resolve, reject) => {
            poolConnection().then((conn)=>{
                conn.query(SQL, bindVars, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }
                    // console.log(results);
                    conn.release();
                    resolve(postInterceptor(results));
                });
            }).catch((error)=>{
                reject(error);                
            })
        });
    } else {
        throw 'setChannel params Undefined!Check it!';
    }

}
