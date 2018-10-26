const express = require('express');
// set router to the express router 
const router = express.Router();
const mongoose = require('mongoose');
// we will be working with protected routes so bring in passport
const passport = require('passport');

//Bring in models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Bring in validation
const validatePostInput = require('../../validation/post');

//@route - GET api/posts/test
//@description - Tests post route
//@access - Public
router.get('/test', (req, res) => res.json({msg: "Posts works"}));

//@route - GET api/posts
//@description - Get all posts
//@access - Public
router.get('/', (req, res) => {
    Post.find()
    .sort({ date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});

//@route - GET api/posts/:id
//@description - Get post by id
//@access - Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post was found with that id'}));
});

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
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
    .then(post => res.json(post));
});

//@route - DELETE api/posts/:id
//@description - delete a post
//@access - Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'User not authorized' });
            }

            // Delete
            post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'Post was not found' }));
    })
});

//@route - POST api/posts/like/:id
//@description - like a post 
//@access - Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            // Check if user has already liked this post
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyliked: 'User has already liked this post' });
            }

            // Add the user id to the likes array
            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'Post was not found' }));
    })
});

//@route - POST api/posts/unlike/:id
//@description - unlike a post 
//@access - Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            // Check if user has already liked this post
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ notliked: 'User has not yet liked this post' });
            }

            // Get the remove index
            const removeIndex = post.likes.map(item => item.user.toString())
            .indexOf(req.user.id);

            // Splice out of array
            post.likes.splice(removeIndex, 1);

            //Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'Post was not found' }));
    })
});

module.exports = router;