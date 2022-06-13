const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
    price: {
        type: Number
    },
    qty: {
        type: Number
    },
    pro_id: {
        type: Number,
        ref: 'Products'
    },
    order_no: {
        type: String,
        ref: 'Orders'
    },
},{timestamps:true});

const OrderDetail = mongoose.model("OrderDetail", OrderDetailSchema);
module.exports = OrderDetail;
