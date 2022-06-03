const mongoose = require("mongoose");
const moment = require('moment-timezone');
const dateLaos = moment.tz("Asia/Vientiane").utcOffset('+0700');
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
    createdAt: {
        type:Date,
        default: dateLaos
    },
    updatedAt:{
        type:Date,
        default: dateLaos
    }
});

const SaleDetail = mongoose.model("SaleDetail", SaleDetailSchema);
module.exports = SaleDetail;
