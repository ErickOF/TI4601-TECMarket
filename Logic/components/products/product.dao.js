const mongoose = require('mongoose');
const productSchema = require('./product.model');

productSchema.statics = {
  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  }
} 

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;