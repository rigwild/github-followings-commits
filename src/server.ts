'use strict'

import router from './router'
import { RequestHandler } from 'micro'

// Main handler
const handler: RequestHandler = async (_req, _res) => {
  _res.setHeader('Content-Type', 'application/json')
  _res.setHeader('Access-Control-Allow-Origin', '*')
  _res.statusCode = 200

  const route = router(_req.url || '/')

  // Route does not exist
  if (!route.exist || !route.fn) {
    _res.statusCode = 500
    return `The provided route "${_req.url}" does not exist.`
  }

  if (route.params) return await route.fn(...route.params)
  else return await route.fn()
}

export default handler
