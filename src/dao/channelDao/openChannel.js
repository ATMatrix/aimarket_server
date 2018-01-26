/**
 * Created by tyzhou on 2018/1/23.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {poolConnection} from '../../util/database';


//openChannel
export function openChannel(module, method, params) {
    //some code
    console.log('channelDao-openChannel', params);
    if (params !== undefined) {
        // let channel_key = params.channel_key;
        console.log("dao params: ", params);        
        let SQL = ` INSERT INTO t_uraiden_channel(AI_ID, ACCOUNT, RECEIVER, DEPOSIT, BALANCE, REMAINING, STATE, BLOCK) VALUES(?,?,?,?,?,?,?,?)`;
        let bindVars = [params.aiId, params.account, params.receiver, params.deposit, params.balance, params.remaining, params.state, params.block];
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
        throw 'openChannel params Undefined!Check it!';
    }

}
