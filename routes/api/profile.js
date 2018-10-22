const express = require('express');
// set router to the express router 
const router = express.Router();
// we want mongoose because we will be working with the database
const mongoose = require('mongoose');
// we will be working with protected routes, so we want passport as well. 
const passport = require('passport');

// Load Profile 
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');
//push 



//@route - GET api/profile/test
//@description - Tests profile route
//@access - Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

//@route - GET api/profile
//@description - Get current user profile
//@access - Private
router.get('/', passport.authenticate('jwt', { session: false }), 
(req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    }
);


module.exports = router;
