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
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-out-btn').show()
  $('#changePassword-btn').show()
  $('#change-password').hide()
  $('#cart').hide()
  // $('#demo').hide()
})
// sign-up
$('#sign-up-btn').click(function () {
  $('#sign-up').show()
  $('#sign-in').hide()
  $('#change-password').hide()
})
$('#login-btn').click(function () {
  $('#sign-in').show()
  $('#sign-up').hide()
})

$('#changePassword-btn').click(function () {
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-password').show()
})
$('#sign-out-btn').click(function () {
  $('#sign-in').show()
  $('#sign-up').hide()
  $('#change-password').hide()
})
