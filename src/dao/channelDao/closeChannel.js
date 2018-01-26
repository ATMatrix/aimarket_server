/**
 * Created by tyzhou on 2018/1/23.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {poolConnection} from '../../util/database';


//closeChannel
export function closeChannel(module, method, params) {
    //some code
    console.log('channelDao-closeChannel', params);
    if (params !== undefined) {
        // let channel_key = params.channel_key;
        console.log("dao params: ", params);    
        let SQL = ` UPDATE t_uraiden_channel SET STATE = 'close' WHERE ACCOUNT = ? and AI_ID = ? `;    
        let bindVars = [params.account, params.aiId];
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
        throw 'closeChannel params Undefined!Check it!';
    }

}
