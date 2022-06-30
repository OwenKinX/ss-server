const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PositionSchema = new Schema({
    ep_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String
    }
},{timestamps:true});

const Position = mongoose.model('Emp-Positions', PositionSchema)
module.exports = Position;