const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

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
}, {
  timestamps: true
});

module.exports = storeSchema;