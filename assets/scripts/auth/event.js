const getFormFields = require('../../../lib/get-form-fields')
// const removebton = require('../templates/car-listing.handlebars')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
const onSignOut = function (event) {
  event.preventDefault()
  // const data = getFormFields(event.target)
  api.signOut()
    .then(ui.signOutSuccess)
   .catch(ui.signOutFailure)
}

// const onCreateProduct = function (event) {
//   event.preventDefault()
//   api.createCart(store.userId)
//     .then(ui.createCartSuccess)
//     .catch(ui.createCartFailure)
// }
const onCreateCart = function (event) {
  event.preventDefault()
  api.createCart(store.userId)
    .then(ui.createCartSuccess)
    .catch(ui.createCartFailure)
}
const onGetCart = function (event) {
  event.preventDefault()
  api.getCart(store.userId)
    .then(ui.getCartSuccess)
    .catch(ui.getCartFailure)
}
const onGetAllProducts = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.getAllProducts(data)
    .then(ui.getAllProductsSuccess)
    .catch(ui.getAllProductsFailure)
}

// const onProductOfUser = function (event) {
//   event.preventDefault()
//   api.productOFUser()
//   .then(ui.productOFUserSuccess)
//   .catch(ui.productOFUserFailure)
// }

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-btn').on('click', onSignOut)
  $('#cart').on('click', onGetAllProducts)
  $('#createcart').on('click', onCreateCart)
  $('#getcart').on('click', onGetCart)
  // $('#test').on('click', onCreateProduct)
}

module.exports = {
  addHandlers
}
