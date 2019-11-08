const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const legal_linkSchema = new Schema({
  nationality: {
    type: String,
    trim: true
  },
  residence: {
    type: Array,
    trim: true
  }
});

module.exports = legal_linkSchema;