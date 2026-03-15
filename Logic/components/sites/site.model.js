const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const singleSiteSchema = new Schema({
  img: {
    type: String,
    trim: true
  },
  idSite: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  rating: {
    type: String,
    trim: true
  },
  schedule: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  distance: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const siteSchema = new Schema({
  id_store: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  sites: {
    type: [singleSiteSchema],
    trim: true
  },
}, {
  timestamps: true
});

module.exports = siteSchema;
