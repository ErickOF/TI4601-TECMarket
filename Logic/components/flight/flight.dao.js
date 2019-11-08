const mongoose = require('mongoose');
const flightSchema = require('./flight.model');

const flightModel = mongoose.model('flights', flightSchema);

module.exports = flightModel;