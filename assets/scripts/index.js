'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})
require('./example')
const authEvents = require('./auth/event.js')

$(() => {
  authEvents.addHandlers()}
// use require with a reference to bundle the file and use it in this file
// const example = require('./example'
