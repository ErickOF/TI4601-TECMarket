const mongoose = require('mongoose');
const airlineSchema = require('./airline.model');

const airlineModel = mongoose.model('airlines', airlineSchema);

module.exports = airlineModel;