const mongoose =  require('mongoose');
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
        required: true
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

const Import = mongoose.model('Imports', ImportSchema)
module.exports = Import;