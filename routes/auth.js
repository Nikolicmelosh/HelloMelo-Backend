const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  // your code here
});

// LOGIN
router.post('/login', async (req, res) => {
  // your code here
});

module.exports = router;
