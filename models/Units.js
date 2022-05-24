const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
    symbol: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    name_en: {
        type: String,
        required: true
    },
},{timestamps:true});

const Unit = mongoose.model("Product-Units", UnitSchema);
module.exports = Unit;
