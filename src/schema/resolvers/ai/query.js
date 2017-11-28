import workers from '../worker'
import config from '../../../../config/worker'

export default async (params) => {
  const aiName = params.type
  const workerConf = config.worker[aiName]
  const Worker = new workers[aiName]

  if (!(Worker && workerConf)) throw '0'
  const worker = new Worker(workerConf)

  const result = await worker.query(params)
  return result
}
