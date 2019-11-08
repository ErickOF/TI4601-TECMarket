const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const saleSchema = new Schema({
    id_user: {
        type: String,
        required: true,
        trim: true,
    },
    id_flight: {
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
    tickets: {
        type: Number,
        required: true,
        trim: true
    },
    suitcases: {
        type: Number,
        required: true,
        trim: true
    },
    observation: {
        type: String,
        required: false,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    seat: {
        type: Number,
        required: true,
        trim: true
    },
}, {
    timestamps: true
});

module.exports = saleSchema;