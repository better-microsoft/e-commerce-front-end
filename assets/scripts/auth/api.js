'use strict'
const config = require('../config')
const store = require('../store.js')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigins.development + '/sign-up',
    method: 'POST',
    data
  })
  // .then((response) => {
  //   console.log(response)
  //   createCart(response)
  // })
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
    createCart(data)
    .then((data) => {
      console.log(data.cart.id)
      updateUser(data)
    })
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

const updateUser = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigins.development + '/users/' + store.userId,
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
  .then((data) => {
    console.log(data)
    return data
  })
    // .then(console.log)
}

const addToCart = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigins.development + '/carts/' + store.cartId,
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
  updateUser,
  // createProduct,
  createCart,
  addToCart,
  getAllProducts
  // productOFUser
}
