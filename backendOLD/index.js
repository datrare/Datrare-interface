const express = require('express');
const app = express();
const mutantcoreRouter = require('./routes/mutantcore');
const cors = require("cors");

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use mutantcore router
app.use('/mutantcore', mutantcoreRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
