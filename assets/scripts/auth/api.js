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
    console.log('Token: ' + store.userToken)
    console.log('User Id: ' + store.userId)
    console.log('Cart Id: ' + store.cartId)
    createCart(data)
    .then((data) => {
      store.cartId = data.cart.id
      console.log('Cart Id2: ' + data.cart.id)
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
  console.log('adding product ' + data)
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

const removeProduct = function (data) {
  console.log('remove product ' + data)
  store.index = data
  return $.ajax({
    url: config.apiOrigins.development + '/carts-decrease/' + store.cartId,
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
  console.log('cart id: ' + store.cartId)
  return $.ajax({
    url: config.apiOrigins.development + '/carts/' + store.cartId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
  })
  .then((response) => {
    console.log(response)
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

const createTransaction = function () {
  console.log('transaction created ' + store.stripeToken)
  return $.ajax({
    url: config.apiOrigins.development + '/transactions',
    method: 'POST',
    headers: {
      ContentType: 'application/json',
      Authorization: 'Token token=' + store.userToken
    },
    data: {
      'transaction': {
        "product": store.productArray,
      "stripe": [store.stripeToken],
      "owner": store.userId
      }
    }
  }).then(() => {
    console.log(store.productArray)
    store.productArray = []
    console.log('products: ' + store.productArray)
    console.log('stripe: ' + data.stripeToken)
    console.log('owner: ' + store.userId)
  })
}

const chargePayment = function () {
  console.log('charge created')
  $('#checkout').hide()
  $('#cart-container').text("Payment Complete")
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
          description: "Purchased at the Floral Shop"
        },
        success: (response) => {
          console.log('successful payment: ', response);
        },
        error: (response) => {
          console.log('error payment: ', response);
        }
      })
      .then((data) => {
        createTransaction()
        createCart(data)
        .then((data) => {
          store.cartId = data.cart.id
          console.log('Cart Id2: ' + data.cart.id)
          updateUser(data)
        })
      })
}

const transactionHistory = function () {
  console.log('cart id: ' + store.cartId)
  return $.ajax({
    url: config.apiOrigins.development + '/transactions',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.userToken
    }
})
  .then((response) => {
    console.log(response)
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
