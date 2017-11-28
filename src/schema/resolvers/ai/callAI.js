/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';
import { Message } from '../../objects'
import query from './query'

const metType = 'callAI'
const codes = {
  success: '900001',
  notFound: '400004',
  error: '400001',
}

export async function callAI() {
  const params = JSON.parse(arguments[1].params)

  try {
    const res = await query(params)
    return new Message(metType, codes.success, res)
  } catch (err) {
    if (err === '0') {
      return new Message("error", codes.notFound, `Not found ${params.type}`)
    }
    console.log(err)
    return new Message("error", codes.error, err)
  }
}
