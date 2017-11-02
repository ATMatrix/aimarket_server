/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {poolConnection} from '../../util/database';


//addUser
export function getAttAddress(module, method, params) {
    //some code
    console.log('userDao-loginUser');
    if (params.user !== undefined) {
        let username = params.user.username;
        console.log("dao username: ", username);        
        let SQL = ` SELECT t.USER_ATT_ADDRESS FROM t_user t WHERE t.USER_NAME = ?`;
        let bindVars = [username];
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
        throw 'getUserAttAddress params.user Undefined!Check it!';
    }

}
