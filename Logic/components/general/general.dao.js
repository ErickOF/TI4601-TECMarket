const mongoose = require('mongoose');
const GeneralSchema = require('./general.model');
/* 
GeneralSchema.statics = {
  create_work_area: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  create_restriction: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  },
  get_work_areas: function (query, cb) {
    this.find(query, cb);
  },
  get_countries: function (query, cb) {
    this.find(query, cb);
  },
  get_country_flights: function (query, cb) {
    this.find(query, cb);
  },
  get_restrictions: function (query, cb) {
    this.find(query, cb);
  },
  get_status: function (query, cb) {
    this.find(query, cb);
  },
  get_regions: function (query, cb) {
    this.find(query, cb);
  }
} */

GeneralSchema.statics = {
  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  login: function (query, cb) {
    this.find(query, cb);
  }
}

const GeneralModel = mongoose.model('others', GeneralSchema);
module.exports = GeneralModel;