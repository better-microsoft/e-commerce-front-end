'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

require('./example')
const authEvents = require('./auth/event.js')

$(() => {
  authEvents.addHandlers()
})
