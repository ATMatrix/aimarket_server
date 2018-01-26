/**
 * Created by 莫西干拳王 on 2018/1/25.
 */

'use strict';

//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import {poolConnection} from '../../util/database';

export function getAiInfo(module, method, params) {
  //some code
  console.log('aiDao-getAiInfo');
  if (params !== undefined) {
    // let channel_key = params.channel_key;
    console.log("getAiInfo dao params: ", params);  
    let SQL = `SELECT * FROM t_ai where t_ai.AI_ID = ?`
    let bindVars = [params.aiId];

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
   }
  else {
    throw 'getAiInfo params Undefined!Check it!';
  }
}
