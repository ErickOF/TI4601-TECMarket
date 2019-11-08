const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const airportSchema = new Schema({
    id_airport: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    info_contact: {
        type: String,
        required: true,
        trim: true
    },
    url_website: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
});

module.exports = airportSchema;