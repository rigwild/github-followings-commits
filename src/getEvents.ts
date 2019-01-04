'use strict'

import { RequestHandler } from 'micro'
import fetch from 'node-fetch'
import { API, initRequest, getParams } from './functions'

const neededParams: Array<string> = ['username']

const handler: RequestHandler = async (req, res) => {
  initRequest(res)
  const body: any = await getParams(req, res, neededParams)
  if (!body) return

  const data = await fetch(`${API}/users/${body.username}/events`)
    .then(res => res.json())
    .catch(console.error)

  res.end(JSON.stringify(data))
}

export default handler
