//后置拦截器
import postInterceptor from '../interceptor/postInterceptor'

//连接DB
import { poolConnection } from '../../util/database'


// Get AI Details
export function getAiDetails(module, method, id) {
  let SQL = `select * from \`t_ai\` ai
  left join \`t_ai_api\` api on ai.\`AI_ID\` = api.\`AI_ID\`
  left join \`t_ai_request\` req on req.\`AI_ID\` = ai.\`AI_ID\`
  left join \`t_request_form\` form on req.\`REQUEST_ID\` = form.\`REQUEST_ID\`
  left join \`t_form_field\` field on field.\`FORM_ID\` = form.\`FORM_ID\`
  where ai.\`AI_ID\` = ${id}`

  const options = {sql: SQL, nestTables: true}
  return new Promise((resolve, reject) => {
    poolConnection().then((conn)=>{
        conn.query(options, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            conn.release();

          const data = results[0]
          const { ai, api, req, form, field } = data

          const profile = {
            creator: ai.AI_BELONG_COMPANY,
            title: ai.AI_NAME_CN,
            host: ai.AI_INTRO_URL,
            tag: 'Medical',
            createAt: 'Created: April 2015',
            logoSrc: '',
            describe: ai.AI_INTRO,
          }

          const apis = {
            items: [
              {
                method: api.METHOD,
                title: api.TITLE,
              },
            ],
          }

          const fs = [
            {
              name: field.NAME,
              type: field.TYPE,
              describe: field.DESCRIBE,
              required: !!field.REQUIRED,
              place_holder: field.PLACE_HOLDER,
            },
          ]

          const forms = [
            {
              title: form.TITLE,
              fields: fs,
            },
          ]

          const request = {
            title: req.TITLE,
            describe: req.DESCRIBE,
            type: req.TYPE,
            forms,
          }


          const resp = {
            apis,
            request,
            profile,
          }

          resolve(postInterceptor(resp));
        });
    }).catch((error)=>{
        reject(error);
    })
  });
}
