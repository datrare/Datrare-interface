const express = require('express');
const router = express.Router();
const db = require('./dbConnection');

router.post('/', (req, res) => {
  const collectionId = req.body.collectionId;
  const ipAddress = req.ip;
  const date = new Date().toISOString().slice(0, 10);
  db.query('INSERT INTO likes (collection_id, ip_address, date) VALUES (?, ?, ?)',[collectionId, ipAddress, date], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).send('User has already liked this collection today');
      } else {
        console.error(err);
        res.status(500).send('Error recording like');
      }
    } else {
      res.send('Like added successfully');
    }

  });
});

router.get('/check-like', (req, res) => {
  const ipAddress = req.ip;
  const date = new Date().toISOString().slice(0, 10);
  db.query('SELECT * FROM likes WHERE date = ? AND ip_address = ?', [date, ipAddress], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error executing MySQL query.');
      return;
    }
    res.send(results);
  });
});

router.get('/:collectionId', (req, res) => {
  const { collectionId } = req.params;
  db.query('SELECT COUNT(*) as num_likes FROM likes WHERE collection_id = ?', [collectionId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Error executing MySQL query.');
      return;
    }
    res.send(...results);
  });
});

module.exports = router;
