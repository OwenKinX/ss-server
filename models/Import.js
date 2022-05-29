const mongoose =  require('mongoose');
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
const Schema = mongoose.Schema

const ImportSchema = new Schema({
    imp_no: {
        type: String,
        required: true,
        unique: true
    },
    c_price: {
        type: Number,
        required: true
    },
    imp_qty: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: dateThailand
    },
    bill_no: {
        type: Number,
        required: true
    },
    product: {
        type: String,
        ref: 'Products',
        required: true
    },
    order: {
        type: String,
        ref: 'Orders',
        required: true
    },
    employee: {
        type: String,
        ref: 'Employees',
        required: true
    }
}, {timestamps: true});

const Imports = mongoose.model('Imports', ImportSchema)
module.exports = Imports;