const name = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('psw')
const passwordConfirmation = document.getElementById('psw-confirmation')
const checkedToS = document.getElementById('grid-check')
const form = document.getElementById('registration-form')
const submitButton = document.getElementById('submit-button')

// Click event on the submit button.
submitButton.addEventListener('click', function (event) {
  var canSubmit = true

  // Do all of the tests so we can print error messages as needed.
  if(!isUsernameValid(name.value)) {
    canSubmit = false
  }

  if(!isEmailValid(email.value)) {
    canSubmit = false
  }

  if(!isPasswordValid(password.value)) {
    canSubmit = false
  } else if (!isRepeatPasswordValid(passwordConfirmation.value, passwordConfirmation.value)) {
    canSubmit = false
  }

  if (canSubmit) {
    register()
  }
})


// Testing username
function isUsernameValid (newUsername) {
  if (!validator.isEmpty(newUsername, { ignore_whitespace: true }) &&
      validator.isAlphanumeric(newUsername + '', ['en-US'] ) &&
      validator.isLength(newUsername + '', { min: 4, max: 100 })) {
      document.getElementById('usernameValidity').innerHTML = ''
    return true
  } else {
    document.getElementById('usernameValidity').innerHTML =
      'Username must be between 4 and 100 alpha-numeric characters long.'
    return false
  }
}

// Testing email
function isEmailValid (newEmail) {
  if (!validator.isEmpty(newEmail, { ignore_whitespace: true }) &&
      validator.isEmail(newEmail + '') &&
      validator.isLength(newEmail + '', { min: 6, max: 100 })) {
      document.getElementById('emailValidity').innerHTML = ''
    return true
  } else {
    document.getElementById('emailValidity').innerHTML =
      'Please check your email.\nEmail must be between 6 and 100 characters long.'
    return false
  }
}

// Testing repeat password
function isPasswordValid (newPassword) {
  if (!validator.isEmpty(newPassword, { ignore_whitespace: true }) &&
      validator.isLength(newPassword + '', { min: 7, max: 100 })) {
    document.getElementById('passwordValidity').innerHTML = ''
    return true
  } else {
    document.getElementById('passwordValidity').innerHTML =
      'Password must be between 7 and 100 characters long.'
    return false
  }
}

// Testing repeat password
function isRepeatPasswordValid (newPassword, passwordConfirmation) {
  if (!validator.isEmpty(newPassword, { ignore_whitespace: true }) &&
      !validator.isEmpty(passwordConfirmation, { ignore_whitespace: true }) &&
      validator.isLength(newPassword + '', { min: 7, max: 100 }) &&
      validator.isLength(passwordConfirmation + '', { min: 7, max: 100 }) &&
      validator.equals(newPassword, passwordConfirmation)) {
    document.getElementById('passwordConfirmationValidity').innerHTML = ''
    return true
  } else {
    document.getElementById('passwordConfirmationValidity').innerHTML =
      'Please check your previous password.\nPassword must be between 7 and 100 characters long.'
    return false
  }
}

function register() {
  var xmlReq = new XMLHttpRequest();

  xmlReq.onload = function() {
    if (xmlReq.status == 200)
      window.location.href =  "/"
    else
      alert(xmlReq.response)
  }

  var params = '?username=' + name.value + '&email=' + email.value + '&password=' + password.value

  xmlReq.open('POST', '/requestRegister' + params, true)
  xmlReq.send(null)
}
