/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {poolConnection} from '../../util/database';


//addUser
export function setAttAddress(module, method, params) {
    //some code
    console.log('userDao-loginUser');
    if (params.user !== undefined) {
        let attAddress = params.user.address;
        let username = params.user.username;
        console.log("dao username: ", username);        
        let SQL = ` UPDATE t_user t SET t.USER_ATT_ADDRESS = ? WHERE t.USER_NAME = ?`;
        let bindVars = [attAddress, username];
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
        throw 'setUserAttAddress params.user Undefined!Check it!';
    }

}
