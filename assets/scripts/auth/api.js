'use strict'
const config = require('../config')
const store = require('../store.js')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigins.production + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigins.production + '/sign-in',
    method: 'POST',
    data
  })
  .then((data) => {
    store.userToken = data.user.token
    store.userId = data.user.id
    createCart(data)
    .then((data) => {
      store.cartId = data.cart.id
      updateUser(data)
    })
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigins.production + '/change-password/' + store.userId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.userToken
    },
    data
  })
}
const signOut = function () {
  return $.ajax({
    url: config.apiOrigins.production + '/sign-out/' + store.userId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
  })
}

const updateUser = function (data) {
  return $.ajax({
    url: config.apiOrigins.production + '/users/' + store.userId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.userToken
    },
    data: {
      'user': {
        'cartId': data.cart.id
      }
    }
  })
}

const createCart = function (data) {
  return $.ajax({
    url: config.apiOrigins.production + '/carts',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.userToken
    },
    data: {
      'cart': {
        'owner': store.userId
      }
    }
  })
  .then((data) => {
    return data
  })
}

const addToCart = function (data) {
  return $.ajax({
    url: config.apiOrigins.production + '/carts/' + store.cartId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.userToken
    },
    data: {
      'cart': {
        'product': data
      }
    }
  })
}

const removeProduct = function (data) {
  store.index = data
  return $.ajax({
    url: config.apiOrigins.production + '/carts-decrease/' + store.cartId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.userToken
    },
    data: {
      'cart': {
        'index': data
      }
    }
  })
}

const getCart = function (data) {
  return $.ajax({
    url: config.apiOrigins.production + '/carts/' + store.cartId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
  })
  .then((response) => {
    return response
  })
}

const createTransaction = function () {
  return $.ajax({
    url: config.apiOrigins.production + '/transactions',
    method: 'POST',
    headers: {
      ContentType: 'application/json',
      Authorization: 'Token token=' + store.userToken
    },
    data: {
      'transaction': {
        'product': store.productArray,
        'stripe': [store.stripeToken],
        'owner': store.userId
      }
    }
  }).then(() => {
    store.productArray = []
  })
}

const chargePayment = function () {
  $('#checkout').hide()
  $('#cart-container').text('Payment Complete')
  $.ajax({
    type: 'POST',
    url: 'https://api.stripe.com/v1/charges',
    headers: {
      Authorization: 'Bearer sk_test_MHUF1Xvxu2c1A1AdSDvdooj6'
    },
    data: {
      amount: store.cartTotal * 100,
      currency: 'usd',
      source: store.stripeToken,
      description: 'Purchased at the Floral Shop'
    }
  })
      .then((data) => {
        createTransaction()
      })
      .then(createCart)
      .then((data) => {
        store.cartId = data.cart.id
        updateUser(data)
      })
}

const transactionHistory = function () {
  return $.ajax({
    url: config.apiOrigins.production + '/transactions',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
  })
  .then((response) => {
    return response
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  updateUser,
  createCart,
  addToCart,
  removeProduct,
  getCart,
  createTransaction,
  chargePayment,
  transactionHistory
}
