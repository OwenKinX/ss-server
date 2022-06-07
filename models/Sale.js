const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    invoice_no: {
        type: String,
        required: true,
        unique: true,
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
    customer: {
        type: Number,
        ref: 'Customers',
    },
    employee: {
        type: String,
        ref: 'Employees',
        required: true
    }
});

const Sale = mongoose.model("Sales", SaleSchema);
module.exports = Sale;
