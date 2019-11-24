const mongoose = require('mongoose');
const storeSchematic = require('./store.model');

storeSchematic.statics = {
  create: function (data, cb) {
    const store = new this(data);
    store.save(cb);
  }
} 

const storeModel = mongoose.model('stores', storeSchematic);
module.exports = storeModel;