'use strict'

import conf from './config'
import fetch from 'node-fetch'

const routes: Array<{ regexp: RegExp; fn: Function }> = [
  {
    // Get all the users the user is following - /:username/events
    regexp: /^\/(.*?)\/followings$/,
    fn: (username: String) =>
      fetch(`${conf.API}/users/${username}/following`).then(res => res.json())
  },
  {
    // Get the last events of a user - /:username/events
    regexp: /^\/(.*?)\/events$/,
    fn: (username: String) =>
      fetch(`${conf.API}/users/${username}/following`).then(res => res.json())
  }
]

const getEvents = (username: String) =>
  fetch(`${conf.API}/users/${username}/events`).then(res => res.json())

interface RouterObj {
  exist: boolean
  fn: Function | null
  params: Array<String> | null
}

// Get an object corresponding to the route
const router = (url: String): RouterObj => {
  let x: Array<String> | null

  for (const aRoute of routes) {
    if ((x = url.match(aRoute.regexp))) {
      return {
        exist: true,
        fn: aRoute.fn,
        params: x.length >= 2 ? x.slice(1) : null
      }
    }
  }

  return { exist: false, fn: null, params: null }
}

export default router
