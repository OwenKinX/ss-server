const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    pc_id: {
        type: String,
        required: true
    },
    // 2
    name: {
        type: String,
        required: true
    },
    // 3
    name_en:{
        type: String,
        required: true
    },
},{timestamps:true})

const Category = mongoose.model('Product-Categories', CategorySchema)

module.exports = Category