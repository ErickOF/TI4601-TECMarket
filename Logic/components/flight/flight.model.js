const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const flightSchema = new Schema({
    id_flight: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    id_airline: {
        type: String,
        required: true,
        trim: true
    },
    date_departure: {
        type: Date,
        required: true,
        trim: true
    },
    date_arrival: {
        type: Date,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    origin: {
        type: String,
        required: true,
        trim: true
    },
    destination: {
        type: String,
        required: true,
        trim: true
    },
    itinerary: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    restrictions: {
        type: Array,
        required: true,
        trim: true
    },
    features: {
        type: Array,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    max_capacity: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = flightSchema;