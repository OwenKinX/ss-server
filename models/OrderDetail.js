const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    ord_qty: {
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
});

const OrderDetail = mongoose.model("OrderDetail", OrderDetailSchema);
module.exports = OrderDetail;
