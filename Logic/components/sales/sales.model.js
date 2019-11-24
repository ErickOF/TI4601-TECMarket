const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const saleProductSchema = new Schema({
  product_code: {
    type: String,
    trim: true
  },
  quantity: {
    type: String,
    trim: true
  },
  total_price: {
    type: String,
    trim: true
  }
});

const salesSchema = new Schema({
  id_sale: {
    type: String,
    required: true,
    trim: true
  },
  id_store: {
    type: String,
    trim: true
  },
  id_user: {
    type: String,
    trim: true
  },
  datetime: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  need: {
    type: Array,
    trim: true
  },
  products: {
    type: [saleProductSchema],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = salesSchema;