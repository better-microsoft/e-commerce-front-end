'use strict'
const showCartTemplate = require('../templates/cart.handlebars')
const store = require('../store')
const api = require('./api')

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
  store.productArray = []
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
  $('#sign-up').show()
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
  store.cartTotal = 0
  $('#cart-container').empty()
  console.log(data, 'products')
  for (let i = 0; i < data.cart.product.length; i++) {
    console.log(data.cart.product[i][0])
    store.productArray.push(data.cart.product[i][0])
    store.cartTotal += data.cart.product[i][0].price
  }
  console.log(store.cartTotal, 'total')
  const showCartHtml = showCartTemplate({cart_products: data.cart.product})
  $('#cart-container').append(showCartHtml)
  $('#customButton').show()
}

const createCartSuccess = (data) => {
  console.log(data, ':-created cart')
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
  $('#cart-container').text("Cart Updated")

}
const removeProductFailure = (error) => {
  console.log(error, ':-remove product error')
}
const createChargeSuccess = (data) => {
  console.log(data, ': charge success')
}
const createChargeFailure = (error) => {
  console.log(error, ': charge error')
}
const chargePaymentSuccess = (data) => {
  console.log(data, ': charge success')
}
const chargePaymentFailure = (error) => {
  console.log(error, ': charge error')
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
  chargePaymentFailure
}
