const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    inv_no: {
        type: String,
        required: true,
        unique: true
    },
    sale_type: {
        type: String,
        required: true
    },
    cash:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    delivery: {
        type: String,
    },
    place_deli:{
        type: String,
    },
    deliver_cost:{
        type: Number,
        default: 0,
    },
    customer: {
        type: Number,
        ref: 'Customers',
        required: true
    },
    employee: {
        type: String,
        ref: 'Employees',
        required: true
    },
});

const Sale = mongoose.model("Sales", SaleSchema);
module.exports = Sale;
