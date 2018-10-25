// rules for experience
const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // isEmpty - title
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }
    
    //isEmpty - company
    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }

    //isEmpty - from
    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}