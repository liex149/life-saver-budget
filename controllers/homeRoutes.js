const withAuth = require('../utils/auth');
const router = require('express').Router();

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);


module.exports = router;