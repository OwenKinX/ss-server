const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderBillSchema = new Schema({
    bill_no: {
        type: Number,
        required: true,
        unique: true
    },
    product: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    employee: {
        type: String,
        required: true
    }
});

const OrderBill = mongoose.model("Order-Bill", OrderBillSchema);
module.exports = OrderBill;