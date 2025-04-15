const express = require('express');
const path = require('path');
const router = express.Router();

// Authentication credentials
const auth = { login: 'atlantamailing', password: 'W@llaceG01' };

// Basic authentication middleware
const basicAuth = (req, res, next) => {
  // Check if authorization header exists
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
    return res.status(401).json({ 
      success: false, 
      message: 'Authorization required' 
    });
  }

  // Parse authorization header
  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64')
    .toString()
    .split(':');
  const username = credentials[0];
  const password = credentials[1];

  // Verify credentials
  if (username === auth.login && password === auth.password) {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
};

// Serve the index.html file for the root route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Protected POST endpoint
router.post('/', basicAuth, (req, res) => {
  try {
    const data = req.body;
    res.status(200).json({
      success: true,
      message: 'Request processed successfully',
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing the request',
      error: error.message
    });
  }
});

module.exports = router;
