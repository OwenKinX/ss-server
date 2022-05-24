const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TypeSchema = new Schema({
    pt_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    category: {
        type: String,
        ref: 'Product-Categories',
        required: true
    }
},{timestamps:true});

const Types = mongoose.model('Product-Types', TypeSchema);
module.exports = Types;