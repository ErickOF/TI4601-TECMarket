const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const userSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  id_rol: {
    type: Number,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  birth: {
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
}, {
  timestamps: true
});

module.exports = userSchema;