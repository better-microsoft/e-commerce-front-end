'use strict'
const showCartTemplate = require('../templates/cart.handlebars')
const showHistoryTemplate = require('../templates/history.handlebars')
const store = require('../store')
const api = require('./api')

const signUpSuccess = (data) => {
  console.log(data)
  $('#sign-up').hide()
  $('#sign-up-btn').hide()
  $('#sign-in').show()
  $('#cart-container').empty()
  $('#history-container').empty()
}

const signInSuccess = (data) => {
  console.log(data)
  $('#sign-in').hide()
  $('#cart').show()
  $('#history').show()
  store.productArray = []
  $('#cart-container').empty()
  $('#history-container').empty()
}
const signInFaliure = (error) => {
  console.log(error)
}
const changePasswordSuccess = (data) => {
  console.log(data)
  $('#cart-container').empty()
  $('#history-container').empty()
}
const changePasswordFaliure = (error) => {
  console.log(error)
}
const signOutSuccess = (data) => {
  $('#sign-in').show()
  $('#sign-up').show()
  // $('#game-board').hide()
  $('#change-password').hide()
  $('#history').hide()
  $('#checkout').hide()
  $('#cart-container').empty()
  $('#history-container').empty()
  console.log('signOutSuccess')
}

const signOutFailure = (error) => {
  console.log(error)
  $('#success').hide()
  $('#error').show()
  $('#errmsg').text('Signout failed.')
}

const getAllProductsSuccess = (data) => {
  store.cartTotal = 0
  $('#cart-container').empty()
  $('#history-container').empty()
  for (let i = 0; i < data.cart.product.length; i++) {
    console.log(data.cart.product[i][0])
    store.productArray.push(data.cart.product[i][0])
    store.cartTotal += data.cart.product[i][0].price
  }
  console.log(store.cartTotal, 'total')
  const showCartHtml = showCartTemplate({cart_products: data.cart.product})
  $('#cart-container').append(showCartHtml)
  if (store.cartTotal !== 0) {
    $('#checkout').show()
  } else {
    $('#cart-container').text('Your Cart Is Empty')
  }
}

const createCartSuccess = (data) => {
  console.log(data, ':-created cart')
  $('#cart-container').empty()
  $('#history-container').empty()
}

const createCartFailure = (error) => {
  console.log(error, ':-created cart error')
}

const getCartSuccess = (data) => {
  console.log(data, ':-get cart')
}

const getCartFailure = (error) => {
  console.log(error, ':-get cart error')
}

const removeProductSuccess = (data) => {
  console.log(data, ':-removed product')
//  $("div[data-id='" + store.index + "']").remove()
  $('#history-container').empty()
  $('#cart-container').text('Cart Updated')
  $('#checkout').hide()
}
const removeProductFailure = (error) => {
  console.log(error, ':-remove product error')
}
const createChargeSuccess = (data) => {
  console.log(data, ': charge success')
  $('#checkout').hide()
}
const createChargeFailure = (error) => {
  console.log(error, ': charge error')
}
const chargePaymentSuccess = (data) => {
  console.log(data, ': charge success')
  $('#cart-container').empty()
  $('#history-container').empty()
  $('#checkout').hide()
  store.productArray = []
}
const chargePaymentFailure = (error) => {
  console.log(error, ': charge error')
}

const transactionHistorySuccess = (data) => {
  console.log(data, ': transaction success')
  $('#history-container').empty()
  console.log(data, 'transactions')
  const showHistoryTemplateHtml = showHistoryTemplate({history: data.transactions})
  $('#history-container').append(showHistoryTemplateHtml)
}
const transactionHistoryFailure = (error) => {
  console.log(error, ': transaction error')
  $('#history-container').empty()
  $('#history-container').text('No Purchase History')
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
