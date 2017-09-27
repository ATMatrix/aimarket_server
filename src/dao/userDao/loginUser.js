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
    console.log('userDao-addUser');
    // if (params.accountName !== undefined) {
    //     var accountName = params.accountName;
    var SQL = `select * from t_user`;
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
