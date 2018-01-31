import workers from '../worker'
import config from '../../../../config/worker'

export default async (params) => {
  const aiName = params.type
  console.log('333333333333shiwen',params)
  const workerConf = config[aiName]
  console.log("----workerConf----", workerConf);
  const Worker = workers[aiName]
  if (!(Worker && workerConf)) throw '0'
  const worker = new Worker(workerConf)

  const result = await worker.query(params)
  return result
}