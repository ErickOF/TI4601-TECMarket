const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const productSchema = new Schema({
  product_code: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: String,
    trim: true
  },
  photo: {
    type: String,
    trim: true
  },
}, {
  timestamps: true
});

const storeSchema = new Schema({
  id_store: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  lat: {
    type: String,
    trim: true
  }, 
  long: {
    type: String,
    trim: true
  },
  img: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  rating: {
    type: String,
    trim: true
  },
  schedule: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  products: {
    type:[productSchema],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = storeSchema;