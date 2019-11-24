const mongoose = require('mongoose');
const salesSchema = require('./sales.model');

salesSchema.statics = {
  create: function (data, cb) {
    const sales = new this(data);
    sales.save(cb);
  }
} 

const salesModel = mongoose.model('sales', salesSchema);
module.exports = salesModel;