const express = require('express');
const router = express.Router();
const db = require('./dbConnection');

// Get all collections
router.get('/', (req, res) => {
  db.query('SELECT * FROM collections_data', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error executing MySQL query.');
      return;
    }
    res.send(results);
  });
});

module.exports = router;
