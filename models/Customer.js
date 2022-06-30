const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CustomerSchema = new mongoose.Schema({
    cus_id: {
        type: Number,
        unique: true,
        default: 0,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname :{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true        
    },
    password: String,
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    province: String,
    district: String,
    village: String
},{timestamps: true})

CustomerSchema.plugin(AutoIncrement, {inc_field: 'cus_id'})

const Customer = mongoose.model('Customers', CustomerSchema)
module.exports = Customer