'use strict'

/*
Notice:
This is a simple router to emulate Zeit-now v2 until now-dev is out (soon)
It's used to dev locally.

When deployed, this file is not sent to now servers.
*/

import { RequestHandler } from 'micro'

import getFollowings from './getFollowings'
import getEvents from './getEvents'

const handler: RequestHandler = (req, res) => {
  switch (req.url) {
    case '/getFollowings': return getFollowings(req, res)
    case '/getEvents': return getEvents(req, res)

    default:
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.statusCode = 404
      res.end(JSON.stringify({ error: 'Unknown route' }))
      break
  }
}

export default handler
