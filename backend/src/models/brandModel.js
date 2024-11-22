const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const BrandDetails = new mongoose.Schema({
    brandID: {
        type: String,
        default: uuidv4,
    },
    brandName: {
        type: String,
        required: true,
    },
    brandAgentEmail: {
        type: String,
        required: true,
    },
    brandContact: {
        type: Number,
        required: true,
    },
});

const brandModel = mongoose.model("brands", BrandDetails);
module.exports = brandModel;
