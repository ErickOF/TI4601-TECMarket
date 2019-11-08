const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const generalSchema = new Schema({
  work_area: {
    type: Array,
    trim: true
  },
  type_official: {
    type: Array,
    trim: true
  },
  country: {
    type: Array,
    trim: true
  },
  restrictions: {
    type: Array,
    trim: true
  },
  features: {
    type: Array,
    trim: true
  },
  status: {
    type: Array,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = generalSchema;