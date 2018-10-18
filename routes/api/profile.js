const express = require('express');
// set router to the express router 
const router = express.Router();

//@route - GET api/profile/test
//@description - Tests profile route
//@access - Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

module.exports = router;