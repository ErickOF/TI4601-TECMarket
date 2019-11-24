'use strict'
const cors = require('cors');

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

const authRoutes = require('./components/auth/auth.routes');
authRoutes(router);

const storeRoutes = require('./components/store/store.routes');
storeRoutes(router);

const productRoutes = require('./components/products/product.routes');
productRoutes(router);

const neo4jRoutes = require('./components/neo4j/neo4j.routes');
neo4jRoutes(router);

router.get('/', (req, res) => {
  res.send('API TECMarket');
});

app.use(router);
app.listen(propierties.PORT, () => console.log(`Server runing on port ${propierties.PORT}`));