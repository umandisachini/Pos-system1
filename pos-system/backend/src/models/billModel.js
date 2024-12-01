const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    billID : String,
    billDate : {type: Date, default: Date.now},
    billTotal : Number,
    items:[{
        productID:String,
        unitPrice:Number,
        quantity:Number,
        total:Number
    }],
});

const bill = mongoose.model("bill",billSchema);
module.exports = bill;