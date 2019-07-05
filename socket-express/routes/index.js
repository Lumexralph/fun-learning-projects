const express = require('express');
const router = express.Router();

// GET homepage
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Socket.io + Express = <3'
  });
});

module.exports = router;