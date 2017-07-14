const getFormFields = require('../../../lib/get-form-fields')
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
  api.signOut()
    .then(ui.signOutSuccess)
   .catch(ui.signOutFailure)
}

const onCreateCart = function (event) {
  event.preventDefault()
  api.createCart(store.userId)
    .then(ui.createCartSuccess)
    .catch(ui.createCartFailure)
}
const onAddToCart = function (event) {
  event.preventDefault()
  const data = $('.eatme').attr('value')
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

const onCreateCharge = function (event) {
  event.preventDefault()
  const handler = StripeCheckout.configure({
    // use secret key
    key: 'pk_test_SeqDNzyICbqoe0SvghiS9vmT',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function (token) {
      store.stripeToken = token.id
      api.chargePayment()
        .then(console.log('success charge'))
        .then(ui.chargePaymentSuccess)
          .then(api.createTransaction)
          .then(ui.createChargeSuccess)
          .catch(ui.createChargeFailure)
        .catch(ui.chargePaymentFailure)
    }
  })
  handler.open({
    name: 'Floral Shop',
    description: 'A flower for any occasion',
    amount: store.cartTotal * 100
  })
}

const onTransactionHistory = function () {
  event.preventDefault()
  api.transactionHistory()
    .then(ui.transactionHistorySuccess)
    .catch(ui.transactionHistoryFailure)
}

const onClearHistory = () => {
  $('#history-container').empty()
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out-btn').on('click', onSignOut)
  $('body').on('click', '.remove-button', onRemoveProduct)
  $('body').on('click', '.clear-button', onClearHistory)
  $('#cart').on('click', onGetCart)
  $('#createcart').on('click', onCreateCart)
  $('#getcart').on('click', onAddToCart)
  $('#checkout').on('click', onCreateCharge)
  $('#history').on('click', onTransactionHistory)
}

module.exports = {
  addHandlers
}
