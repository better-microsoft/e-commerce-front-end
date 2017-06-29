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

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
  .then((response) => {
    store.userToken = response.user.token
    store.userId = response.user.id
    return store
  })
  .then(console.log)
}
const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.userId,
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
    url: config.apiOrigin + '/sign-out/' + store.userId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
  })
  .then(console.log)
}

// const createProduct = function  {
//   return $.ajax({
//     url: config.apiOrigin + '/products',
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
    url: config.apiOrigin + '/carts',
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
    url: config.apiOrigin + '/carts',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
  })
}

const getAllProducts = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/products',
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
//     url: config.apiOrigin + '/products/',
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
