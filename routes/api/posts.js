const express = require('express');
// set router to the express router 
const router = express.Router();
const mongoose = require('mongoose');
// we will be working with protected routes so bring in passport
const passport = require('passport');

//Bring in models
const Post = require('../../models/Post');

// Bring in validation
const validatePostInput = require('../../validation/post');

//@route - GET api/posts/test
//@description - Tests post route
//@access - Public
router.get('/test', (req, res) => res.json({msg: "Posts works"}));

//@route - POST api/posts
//@description - Create a post
//@access - Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check validation
if (!isValid) {
    // If any errors, send 400 with errors obj
    return res.status(400).json(errors);
}

    const newPost = new Post({
        test: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.user.id
    });

    newPost.save()
    .then(post => res.json(post));
});

module.exports = router;