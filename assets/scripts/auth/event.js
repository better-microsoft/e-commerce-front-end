const getFormFields = require('../../../lib/get-form-fields')
// const removebton = require('../templates/car-listing.handlebars')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  data.credentials.cartId = 'empty'
  console.log(data)
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
const onAddToCart = function (event) {
  event.preventDefault()
  const data = $('.eatme').val()
  console.log('add to cart ' + data)
  api.addToCart(data)
    .then(ui.getCartSuccess)
    .catch(ui.getCartFailure)
}
const onGetCart = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('get form field', data)
  api.getCart(data)
    .then(ui.getAllProductsSuccess)
    .catch(ui.getAllProductsFailure)
}

const onRemoveProduct = function (event) {
  event.preventDefault()
  const data = $(event.target).parent().attr('data-id')
  api.removeProduct(data)
    .then(ui.removeProductSuccess)
    .catch(ui.removeProductFailure)
}

// const onProductOfUser = function (event) {
//   event.preventDefault()
//   api.productOFUser()
//   .then(ui.productOFUserSuccess)
//   .catch(ui.productOFUserFailure)
// }

const onCreateCharge = function (event) {
  event.preventDefault();
  const handler = StripeCheckout.configure({
    key: 'pk_test_6stLdVdL0HAAUtX3YOUt9y4y',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
      const credentials = {
        stripeToken: token.id,
      };
      console.log(credentials)
      api.createTransaction(credentials)
        .then(console.log('success'))
        .then(ui.createChargeSuccess)
        .catch(ui.createChargeFailure)
      }
    })
    handler.open({
      name: 'Nozama.com',
      description: '2 widgets',
      amount: 2000
    });
  }


const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-btn').on('click', onSignOut)
  $('body').on('click', '.remove-button', onRemoveProduct)
  $('#cart').on('click', onGetCart)
  $('#createcart').on('click', onCreateCart)
  $('#getcart').on('click', onAddToCart)
  $('#checkout').on('click', onCreateCharge)
  // $('#test').on('click', onCreateProduct)
}

module.exports = {
  addHandlers
}
