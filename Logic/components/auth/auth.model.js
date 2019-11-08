const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const userSchema = new Schema({
  id_user: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  rol: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  /* Passenger */
  name: {
    type: String,
    trim: true
  },
  date_birth: {
    type: String,
    trim: true
  },
  nationality: {
    type: String,
    trim: true
  },
  residence: {
    type: String,
    trim: true
  },
  phone: {
    type: Array,
    trim: true
  }, 
  email: {
    type: String,
    trim: true
  },
  /* Official */
  type: {
    type: String,
    trim: true
  },
  date_admission: {
    type: String,
    trim: true
  },
  work_area: {
    type: String,
    trim: true
  },
}, {
  timestamps: true
});

module.exports = userSchema;