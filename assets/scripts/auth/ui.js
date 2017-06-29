const store = require('../store')

const signUpSuccess = (data) => {
  console.log(data)
  $('#sign-up').hide()
  $('#sign-up-btn').hide()
  $('#sign-in').show()
}

const signInSuccess = (data) => {
  console.log(data)
  $('#sign-in').hide()
  $('#cart').show()
}
const signInFaliure = (error) => {
  console.log(error)
}
const changePasswordSuccess = (data) => {
  console.log(data)
}
const changePasswordFaliure = (error) => {
  console.log(error)
}
const signOutSuccess = (data) => {
  $('#sign-in').show()
  $('#sign-up').hide()
  // $('#game-board').hide()
  $('#change-password').hide()
  console.log('signOutSuccess')
}

const signOutFailure = (error) => {
  console.log(error)
  $('#success').hide()
  $('#error').show()
  $('#errmsg').text('Signout failed.')
}

const getAllProductsSuccess = (data) => {
  console.log(data, 'products')
  console.log(data)
  for (let i = 0; i < data.products.length; i++) {
    $('#demo').append(data.products[i].id)
    $('#demo').append(data.products[i].name)
    $('#demo').append(data.products[i].description)
  }
  console.log(store.products)
}

const createCartSuccess = (data) => {
  console.log(data, ':-created cart')
}

const createCartFailure = (error) => {
  console.log(error, ':-created cart error')
}
module.exports = {
  signUpSuccess,
  signInSuccess,
  signInFaliure,
  changePasswordSuccess,
  changePasswordFaliure,
  signOutSuccess,
  signOutFailure,
  getAllProductsSuccess,
  createCartSuccess,
  createCartFailure
}
