const express = require('express');
const router = express.Router();
const db = require('./dbConnection');

// Create a new NFT entry
router.post('/', async (req, res) => {
  try {
    // Extract the data from the request body
    const { nft_name, nft_showcase, start_date, end_date, chain, price, total_supply, website, discord, twitter } = req.body;
    
    // Execute an INSERT INTO query to insert the new NFT data into the database
    await db.query(`INSERT INTO nftcalendar (nft_name, nft_showcase, start_date, end_date, chain, price, total_supply, website, discord, twitter) VALUES ('${nft_name}', '${nft_showcase}', '${start_date}', '${end_date}', '${chain}', '${price}', '${total_supply}', '${website}', '${discord}', '${twitter}')`);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Error executing MySQL query.');
  }
});

module.exports = router;
