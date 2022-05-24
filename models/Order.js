const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    order_no: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        required: true,
    },
    employee: {
        type: String,
        ref: 'Employees',
        required: true
    },
    supplier: {
        type: String,
        ref: 'Suppliers',
        required: true
    },
});

const Order = mongoose.model("Orders", OrderSchema);
module.exports = Order;
