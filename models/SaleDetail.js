const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaleDetailSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    pro_id: {
        type: Number,
        ref: 'Products',
        required: true
    },
    inv_no: {
        type: String,
        ref: 'Sales',
        required: true
    }
},{timestamps:true});

const SaleDetail = mongoose.model("SaleDetail", SaleDetailSchema);
module.exports = SaleDetail;
