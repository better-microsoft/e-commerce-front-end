'use strict'
const config = require('../config')
const store = require('../store.js')

const signUp = function (data) {
  console.log('data is', data)
  return $.ajax({
    url: config.apiOrigins.development + '/sign-up/',
    method: 'POST',
    data
  })
}
module.exports = {
  signUp
}
