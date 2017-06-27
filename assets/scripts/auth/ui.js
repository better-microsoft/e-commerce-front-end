const signUpSuccess = (data) => {
  console.log(data)
  $('#sign-up').hide()
  $('#sign-up-btn').hide()
  $('#sign-in').show()
}

const signInSuccess = (data) => {
  console.log(data)
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
  $('#sign-up').hide()
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
module.exports = {
  signUpSuccess,
  signInSuccess,
  signInFaliure,
  changePasswordSuccess,
  changePasswordFaliure,
  signOutSuccess,
  signOutFailure
}
