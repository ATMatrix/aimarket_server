/**
 * Created by zhubg on 2017/9/27.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {pool} from '../../util/database';


//addUser
export function addUser(module, method, params) {
    //some code
    console.log('userDao-addUser');
    if (params.user !== undefined) {
        let username = params.user.username;
        let email = params.user.email;
        let password = params.user.password;
        let SQL = `INSERT INTO t_user(USER_NAME,USER_EMAIL,USER_PASSWORD) VALUES (?,?,?)`;
        let bindVars = [username, email, password];
        //promise
        return new Promise((resolve, reject) => {
            pool.query(SQL, bindVars, (error, results, fields) => {
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

