const express = require('express');
const router = express.Router();
const db = require('./dbConnection');

// Get all mutants
router.get('/', (req, res) => {
  db.query('SELECT * FROM collections_data where Datrare="Mutant Ape Yacht Core"', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error executing MySQL query.');
      return;
    }
    res.send(results);
  });
});

module.exports = router;
