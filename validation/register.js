//rules for registration
const isEmpty = require('./is-empty');

const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    //isEmpty - name
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    //isEmpty - email
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    //isEmail - email
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email format';
    }

    //isEmpty - password
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    //passwordLength - password
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 and 30 characters long';
    }

    //isEmpty - password2
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required';
    }

    //Match password - password
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}