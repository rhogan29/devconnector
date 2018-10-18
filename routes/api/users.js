const express = require('express');
// set router to the express router 
const router = express.Router();

//@route - GET api/users/test
//@description - Tests users route
//@access - Public
router.get('/test', (req, res) => res.json({msg: "Users works"}));

module.exports = router;