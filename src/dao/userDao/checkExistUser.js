/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {rdsConnection, rdsConnet, rdsEnd} from '../../util/database';


//addUser
export function checkExistUser(module, method, params) {
    //some code
    console.log('userDao-checkExistUser');
    if (params.user !== undefined) {
        let username = params.user.username;
        let SQL = `SELECT * FROM t_user WHERE USER_NAME=?`;
        let bindVars = [username];
        //promise
        return new Promise((resolve, reject) => {
            rdsConnection.query(SQL, bindVars, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                // console.log(results);
                resolve(postInterceptor(results));
            });
        });
    } else {
        throw 'params.user Undefined!Check it!';
    }
}
