const mongoose = require('mongoose');
const siteSchematic = require('./site.model');

siteSchematic.statics = {
  create: function (data, cb) {
    const site = new this(data);
    site.save(cb);
  }
} 

const siteModel = mongoose.model('sites', siteSchematic);
module.exports = siteModel;