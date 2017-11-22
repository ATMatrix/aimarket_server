/**
 * Created by 莫西干拳王 on 2017/11/22.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {poolConnection} from '../../util/database';


//addUser
export function getAiList(module, method, params) {
    //some code
    console.log('aiDao-getAiList');
    let SQL = `SELECT * FROM t_ai`

    return new Promise((resolve, reject) => {
      poolConnection().then((conn)=>{
          conn.query(SQL, (error, results, fields) => {
              if (error) {
                  reject(error);
              }
              console.log(results);
              conn.release();
              resolve(postInterceptor(results));
          });
      }).catch((error)=>{
          reject(error);                
      })
  });

}
