const express = require('express');
const { signup, updateUser } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/updateUser', updateUser);

module.exports = router;
