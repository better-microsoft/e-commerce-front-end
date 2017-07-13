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
  $('#cart-container').empty()
  console.log(data, 'products')
  console.log(data.cart.product[0])
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
  removeProductFailure
}
