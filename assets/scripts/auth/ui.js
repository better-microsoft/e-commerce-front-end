'use strict'
const showCartTemplate = require('../templates/cart.handlebars')
const showHistoryTemplate = require('../templates/history.handlebars')
const store = require('../store')
const api = require('./api')

const signUpSuccess = (data) => {
  $('#sign-up').hide()
  $('#sign-up-btn').hide()
  $('#sign-in').show()
  $('#cart-container').empty()
  $('#history-container').empty()
  $('#notifications').empty()
  $('#notifications').text('Sign up success')
}

const signUpFailure = () => {
  $('#notifications').empty()
  $('#notifications').text('Sign up failure')
}

const signInSuccess = (data) => {
  $('#sign-in').hide()
  $('#sign-out-btn').show()
  $('#login-btn').hide()
  $('#sign-up-btn').hide()
  $('#cart').show()
  $('#history').show()
  $('#changePassword-btn').show()
  store.productArray = []
  $('#cart-container').empty()
  $('#history-container').empty()
  $('#notifications').empty()
  $('#notifications').text('Sign in success')
}
const signInFaliure = (error) => {
  $('#notifications').empty()
  $('#notifications').text('Sign in failure')
}
const changePasswordSuccess = (data) => {
  $('#cart-container').empty()
  $('#history-container').empty()
  $('#notifications').empty()
  $('#change-password').hide()
  $('#notifications').text('Change password success')
}
const changePasswordFaliure = (error) => {
  console.log(error)
  $('#notifications').empty()
  $('#notifications').text('Change password failure')
}
const signOutSuccess = (data) => {
  $('#changePassword-btn').hide()
  $('#sign-out-btn').hide()
  $('#login-btn').show()
  $('#sign-up-btn').show()
  $('#cart').hide()
  $('#sign-in').show()
  $('#sign-up').hide()
  // $('#game-board').hide()
  $('#change-password').hide()
  $('#history').hide()
  $('#checkout').hide()
  $('#cart-container').empty()
  $('#history-container').empty()
  $('#notifications').empty()
  $('#notifications').text('Sign out success')
}

const signOutFailure = (error) => {
  $('#success').hide()
  $('#error').show()
  $('#errmsg').text('Signout failed.')
  $('#notifications').empty()
  $('#notifications').text('Sign out failed')
}

const getAllProductsSuccess = (data) => {
  store.cartTotal = 0
  $('#cart-container').empty()
  $('#history-container').empty()
  for (let i = 0; i < data.cart.product.length; i++) {
    store.productArray.push(data.cart.product[i][0])
    store.cartTotal += data.cart.product[i][0].price
  }
  const showCartHtml = showCartTemplate({cart_products: data.cart.product})
  $('#cart-container').append(showCartHtml)
  if (store.cartTotal !== 0) {
    $('#checkout').show()
  } else {
    $('#cart-container').text('Your Cart Is Empty')
  }
  $('#notifications').empty()
}

const createCartSuccess = (data) => {
  $('#cart-container').empty()
  $('#history-container').empty()
  $('#notifications').empty()
}

const createCartFailure = (error) => {
  $('#notifications').empty()
  $('#notifications').text('An error has occurred, please sign out and sign back in and try again')
}

const getCartSuccess = (data) => {
  $('#cart-container').empty()
  $('#cart-container').text('Product Added')
}

const getCartFailure = (error) => {
  $('#notifications').empty()
  $('#notifications').text('An error has occurred, please make sure you are signed in.')
}

const removeProductSuccess = (data) => {
//  $("div[data-id='" + store.index + "']").remove()
  $('#history-container').empty()
  $('#cart-container').text('Cart Updated')
  $('#checkout').hide()
  $('#notifications').empty()
}
const removeProductFailure = (error) => {
  $('#notifications').empty()
  $('#notifications').text('An error has occurred, pleasure try again.')
}
const createChargeSuccess = (data) => {
  $('#checkout').hide()
  $('#notifications').empty()
}
const createChargeFailure = (error) => {
  $('#notifications').empty()
}
const chargePaymentSuccess = (data) => {
  $('#cart-container').empty()
  $('#history-container').empty()
  $('#checkout').hide()
  $('#notifications').empty()
}
const chargePaymentFailure = (error) => {
  $('#notifications').empty()
}

const transactionHistorySuccess = (data) => {
  $('#history-container').empty()
  const showHistoryTemplateHtml = showHistoryTemplate({history: data.transactions})
  $('#history-container').append(showHistoryTemplateHtml)
  $('#notifications').empty()
}

const transactionHistoryFailure = (error) => {
  $('#history-container').empty()
  $('#history-container').text('No Purchase History')
  $('#notifications').empty()
  $('#notifications').text('Transaction History Failure, pleasure make sure you are signed in and have previous purchases.')
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFaliure,
  changePasswordSuccess,
  changePasswordFaliure,
  signOutSuccess,
  signOutFailure,
  getAllProductsSuccess,
  createCartSuccess,
  createCartFailure,
  getCartSuccess,
  getCartFailure,
  removeProductSuccess,
  removeProductFailure,
  createChargeSuccess,
  createChargeFailure,
  chargePaymentSuccess,
  chargePaymentFailure,
  transactionHistorySuccess,
  transactionHistoryFailure
}
