const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const airlineSchema = new Schema({
    id_airline: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name_airport: {
        type: String,
        required: true,
        trim: true,
    },
    name_airline: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});

module.exports = airlineSchema;