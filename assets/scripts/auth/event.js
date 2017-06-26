const getFormFields = require('../../../lib/get-form-fields')
// const removebton = require('../templates/car-listing.handlebars')
const api = require('./api')
const ui = require('./ui')
// const store = require('../store')

const onSignUp = function (event) {
  console.log("hello")
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const addhandlers = () => {
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  addhandlers
}
