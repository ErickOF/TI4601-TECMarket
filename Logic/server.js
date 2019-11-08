'use strict'
const cors = require('cors');

const authRoutes = require('./components/auth/auth.routes');
const generalRoutes = require('./components/general/general.routes');

const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');
// init DB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors()); // Accept all CORS Methods

app.use('/api', router);

// generalRoutes(router);


authRoutes(router);

router.get('/', (req, res) => {
  res.send('API TECMarket');
});

app.use(router);
app.listen(propierties.PORT, () => console.log(`Server runing on port ${propierties.PORT}`));