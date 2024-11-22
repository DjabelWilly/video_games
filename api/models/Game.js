const mongoose = require("mongoose");

const GameSchema = mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true
        },
        platform: {
            type: 'string',
            required: true
        },
        year: {
            type: 'number',
            required: true
        },
        genre: {
            type: 'string',
            required: true
        },
        publisher: {
            type: 'string',
            required: true
        },
        naSales: {
            type: 'number',
            required: true
        },
        euSales: {
            type: 'number',
            required: true
        },
        jpSales: {
            type: 'number',
            required: true
        },
        otherSales: {
            type: 'number',
            required: true
        },
        globalSales: {
            type: 'number',
            required: true
        }
    }
);
module.exports = mongoose.model('Game', GameSchema);
