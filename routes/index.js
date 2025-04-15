const express = require('express');
const path = require('path');
const router = express.Router();

// Serve the index.html file for the root route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/', (req, res) => {
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
