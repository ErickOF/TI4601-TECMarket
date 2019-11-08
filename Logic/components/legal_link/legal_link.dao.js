const mongoose = require('mongoose');
const Legal_LinkSchema = require('./legal_link.model');
const Legal_LinkModel = mongoose.model('legal_links', Legal_LinkSchema);
module.exports = Legal_LinkModel;