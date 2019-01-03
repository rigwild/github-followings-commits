'use strict'

import conf from './config'
import fetch from 'node-fetch'

// Get all the users the user is following
const getFollowings = (username: String) =>
  fetch(`${conf.API}/users/${username}/following`).then(res => res.json())

// Get the last events of a user
const getEvents = (username: String) =>
  fetch(`${conf.API}/users/${username}/events`).then(res => res.json())

interface RouterObj {
  exist: boolean
  fn: Function | null
  params: Array<String> | null
}

// Get the function corresponding to the route
const router = (url: String): RouterObj => {
  let res: RouterObj
  let x: Array<String> | null

  if ((x = url.match(/\/(.*?)\/followings/))) {
    res = {
      exist: true,
      fn: getFollowings,
      params: x.length >= 2 ? x.slice(1) : null
    }
  } else if ((x = url.match(/\/(.*?)\/events/))) {
    res = {
      exist: true,
      fn: getEvents,
      params: x.length >= 2 ? x.slice(1) : null
    }
  } else res = { exist: false, fn: null, params: null }

  return res
}

export default router
