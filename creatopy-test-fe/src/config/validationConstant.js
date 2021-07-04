export const Validations = {
  // eslint-disable-next-line
  emailValidation: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  passwordValidation: /.{6,}/,
}

export const Messages = {
  emailMessage: 'Not a valid email address',
  passwordMessage: 'Password should be at least 6 characters',
  emptyMessage: 'The field cannot be empty',
}

export const ValidationTypes = {
  NOT_EMPTY: 'NOT_EMPTY',
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
}
