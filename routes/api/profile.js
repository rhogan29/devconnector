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

//@route - POST api/profile
//@description - Create or Edit user profile
//@access - Private
router.post('/', passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
        // skills - split into an array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        // social 
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                //update
                Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                )
                .then(profile => res.json(profile));
            } else {
                //check if handle exists
                Profile.findOne({ handle: profileFields.handle })
                .then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    }

                    // save profile
                    new Profile(profileFields)
                    .save()
                    .then(profile => res.json(profile));
                });
            }
        });
    }
);


module.exports = router;
