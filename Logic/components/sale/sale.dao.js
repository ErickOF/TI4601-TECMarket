const mongoose = require('mongoose');
const saleSchema = require('./sale.model');
const saleModel = mongoose.model('sales', saleSchema);
module.exports = saleModel;