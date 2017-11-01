/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {rdsConnection, rdsConnet, rdsEnd} from '../../util/database';


//addUser
export function loginUser(module, method, params) {
    //some code
    console.log('userDao-loginUser');
    if (params.user !== undefined) {
        let username = params.user.username;
        let password = params.user.password;
        let SQL = ` SELECT * FROM t_user t WHERE t.USER_NAME = ? AND t.USER_PASSWORD = ? `;
        let bindVars = [username, password];
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

    //promise
    return new Promise((resolve, reject) => {
        rdsConnection.query(SQL, (error, results  ,fields) => {
            if (error) {
                throw error;
            }
            console.log(results);
            resolve(postInterceptor(results));
        });
    });
}
