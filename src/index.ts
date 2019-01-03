'use strict'

import micro from 'micro'
import server from './server'

const port = 3000

micro(server).listen(port)
console.log(`server is listening on port ${port}`)
