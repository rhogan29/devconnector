const express = require('express');
// set router to the express router 
const router = express.Router();

//@route - GET api/posts/test
//@description - Tests post route
//@access - Public
router.get('/test', (req, res) => res.json({msg: "Posts works"}));

module.exports = router;