'use strict'

const API = 'https://github-followings-commits.now.sh/api'

new Vue({
  el: '#app',
  data() {
    return {
      searchedUser: 'rigwild',
      events: null
    }
  },
  async mounted() {
    this.getEvents(this.searchedUser)
  },
  methods: {
    async api(route, method = 'GET', body) {
      const res = await fetch(API + route, {
        method,
        headers: {},
        body: JSON.stringify(body)
      })
      return await res.json()
    },

    // Get GitHub events for a user. refreshCache = check if cache contains data
    getEvents(username, refreshCache = false) {
      // Load from API
      const load = async () => {
        const data = await this.api('/getEvents', 'POST', { username })
        localStorage.setItem('events', JSON.stringify(data))

        console.log('Loaded events from API.')
        this.events = data
      }

      if (!refreshCache) {
        let data = JSON.parse(localStorage.getItem('events'))
        if (!data) return load()
        else {
          console.log('Loaded events from cache.')
          this.events = data
        }
      }
      return load()
    }
  }
})
