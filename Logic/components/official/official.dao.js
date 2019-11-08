const mongoose = require('mongoose');
const officialSchema = require('./official.model');

const authSchema = require('../auth/auth.model');

/* users <- official */
const officialModel = mongoose.model('users', authSchema);
module.exports = officialModel;