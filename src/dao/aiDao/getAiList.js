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
    console.log(params) //todo::根据params 返回相应结果，加入ORM：sequelize
    let SQL = `SELECT * FROM t_ai`
    return new Promise((resolve, reject) => {
      poolConnection().then((conn)=>{
          conn.query(SQL, (error, results, fields) => {
              if (error) {
                  reject(error);
              }
              conn.release();
              resolve(postInterceptor(results));
          });
      }).catch((error)=>{
          reject(error);
      })
  });

}

