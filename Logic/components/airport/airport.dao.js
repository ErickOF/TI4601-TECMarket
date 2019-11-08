const mongoose = require('mongoose');
const airportSchema = require('./airport.model');

const airportModel = mongoose.model('airports', airportSchema);

module.exports = airportModel;