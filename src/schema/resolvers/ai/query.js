import workers from '../worker'
import config from '../../../../config/worker'

export default async (params) => {
  const aiName = params.type
  const workerConf = config[aiName]
  const Worker = workers[aiName]
  if (!(Worker && workerConf)) throw '0'
  const worker = new Worker(workerConf)

  const result = await worker.query(params)
  return result
}
