const mongoose =  require('mongoose');
const Schema = mongoose.Schema

const ImportSchema = new Schema({
    imp_no: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    bill_no: {
        type: Number,
        required: true
    },
    order_no: {
        type: String,
        ref: 'Orders',
        required: true
    },
    employee: {
        type: String,
        ref: 'Employees'
    }
}, {timestamps: true});

const Imports = mongoose.model('Imports', ImportSchema);
module.exports = Imports
    