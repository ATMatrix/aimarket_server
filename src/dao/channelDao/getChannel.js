/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {poolConnection} from '../../util/database';


//getChannel
export function getChannel(module, method, params) {
    //some code
    console.log('channelDao-getChannel', params);
    if (params !== undefined) {
        let userAccount = params.account;
        console.log("dao userAccount aiId: ", userAccount, params.aiId);        
        let SQL = ` SELECT * FROM t_uraiden_channel t WHERE t.ACCOUNT = ? and t.AI_ID = ? and t.STATE = 'open'`;
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
        throw 'getChannel params Undefined!Check it!';
    }

}
