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

export function getAiInfo(module, method, id) {
    //some code
    console.log('aiDao-getAiList');
    let SQL = `select * from \`t_ai\` ai
    left join \`t_ai_api\` api on ai.\`AI_ID\` = api.\`AI_ID\`
    left join \`t_ai_request\` req on req.\`AI_ID\` = ai.\`AI_ID\`
    left join \`t_request_form\` form on req.\`REQUEST_ID\` = form.\`REQUEST_ID\`
    left join \`t_form_field\` field on field.\`FORM_ID\` = form.\`FORM_ID\`
    where ai.\`AI_ID\` = ${id}`
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