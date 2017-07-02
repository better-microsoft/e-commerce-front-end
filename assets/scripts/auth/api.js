'use strict'
const config = require('../config')
const store = require('../store.js')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigins.development + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigins.development + '/sign-in',
    method: 'POST',
    data
  })
  .then((data) => {
    store.userToken = data.user.token
    store.userId = data.user.id
    store.cartId = data.user.cartId
    return data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigins.development + '/change-password/' + store.userId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.userToken
    },
    data
  })
  .then(console.log)
}
const signOut = function () {
  return $.ajax({
    url: config.apiOrigins.development + '/sign-out/' + store.userId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
  })
  .then(console.log)
}

// const createProduct = function  {
//   return $.ajax({
//     url: config.apiOrigins.development + '/products',
//     method: 'POST',
//     headers: {
//       Authorization: 'Token token=' + store.userToken
//     },
//     data: {
//   //     'product': {
//   //       'name' :
//   //       // 'price' :
//   //       'description' :
//   //     }
//     }
//   })
// }
const createCart = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigins.development + '/carts',
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
    // .then(console.log)
}

const getCart = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigins.development + '/carts',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
  })
}

const getAllProducts = function (data) {
  return $.ajax({
    url: config.apiOrigins.development + '/products',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
  })
  .then((response) => {
    store.productId = response.products.id
    store.products = response.products
    return response
  })
}

// const productOFUser = function (event) {
//   return $.ajax({
//     url: config.apiOrigins.development + '/products/',
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.userToken
//     }
//   })
// }
module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  // createProduct,
  createCart,
  getCart,
  getAllProducts
  // productOFUser
}
