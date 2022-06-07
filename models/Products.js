const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    pro_id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    stock_qty: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        ref: "Product-Types",
        required: true,
    },
    unit: {
        type: String,
        ref: "Product-Units",
        required: true,
    },
    image: String,
},{timestamps:true});

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
