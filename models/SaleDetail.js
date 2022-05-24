const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaleDetailSchema = new Schema({
    sle_qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product: {
        type: String,
        ref: 'Products',
        required: true
    },
    sale: {
        type: String,
        ref: 'Sales',
        required: true
    },
});

const SaleDetail = mongoose.model("SaleDetail", SaleDetailSchema);
module.exports = SaleDetail;
