// rules for login
const isEmpty = require('./is-empty');

const Validator = require('validator');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    // check handle length
    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle must be between 2 and 40 characters long';
    }
    // check handle isEmpty
    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }
    // check status
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }
    // check skills
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    //check if website is empty
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid website URL';
        }
    }

    //check if youtube is empty
    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid youtube URL';
        }
    }

    //check if twitter is empty
    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid Twitter URL';
        }
    }

    //check if facebook is empty
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid facebook URL';
        }
    }

    //check if linkedin is empty
    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid linkedin URL';
        }
    }

    //check if instagram is empty
    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid instagram URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}