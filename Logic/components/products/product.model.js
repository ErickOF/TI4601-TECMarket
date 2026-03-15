const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = productSchema;
