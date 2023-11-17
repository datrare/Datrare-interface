const express = require('express');
const app = express();
const likesRouter = require('./likes')
const collectionsRouter = require('./collections');
const mutantcoreRouter = require('./mutantcore');
const kyudoarcherRouter = require('./kyudoarcher');
const upcomingnftRouter = require('./upcomingnft');
const submitupcomingnftRouter = require('./submitupcomingnft');
const zkpunksRouter = require('./zkpunks')
const moondogsRouter = require('./moondogs')
const skullverseRouter = require('./skullverse')
const zksyncbirdRouter = require('./zksyncbird')
const koolcamelsRouter = require('./koolcamels')
const datverifRouter = require('./datverif')

const cors = require("cors");

const corsOptions = {
  origin: ['*','https://datrare.com', 'http://localhost:3000'],
  credentials:true,
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Set up middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// verify holder
app.use('/datverif', datverifRouter);

// collection homepage
app.use('/collections', collectionsRouter);

//Collection Likes
app.use('/collection-like', likesRouter);

// core collections
app.use('/mutantcore', mutantcoreRouter);
app.use('/kyudoarcher', kyudoarcherRouter);
app.use('/moondogs', moondogsRouter);

// zksync collections
app.use('/zkpunks', zkpunksRouter);
app.use('/skullverse', skullverseRouter);
app.use('/zksyncbird', zksyncbirdRouter);
app.use('/koolcamels', koolcamelsRouter);

// upcoming NFT
app.use('/upcomingnft', upcomingnftRouter);
app.use('/submitupcomingnft', submitupcomingnftRouter);

//data statistic


app.get('/', (req, res) => {
    res.send("Server Working...")
})

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});


