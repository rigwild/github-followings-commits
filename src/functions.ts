'use strict'

import { IncomingMessage, ServerResponse } from 'http'
import { json } from 'micro'

// Set error message in a string { error: error_message }
const error = (error: string): string => JSON.stringify({ error })

// API prefix
export const API = 'https://api.github.com'

// Init API default headers/status code
export const initRequest = (res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
}

// Middleware. Get JSON parameters sent in the request body
// If missing parameters, stops the execution
export const getParams = async (
  req: IncomingMessage,
  res: ServerResponse,
  neededParams: Array<string>
): Promise<object | void> => {
  let body: object = {}
  try {
    body = await json(req)
  } catch (e) {
    res.end(error(`Invalid JSON was sent.`))
    return
  }

  // Check every parameters are present
  if (!neededParams.every(param => body.hasOwnProperty(param))) {
    res.end(error(`Missing parameter(s). Needed Parameter(s) : [${neededParams.toString()}].`))
    return
  }
  return body
}
