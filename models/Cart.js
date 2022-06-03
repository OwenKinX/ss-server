const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateLaos = moment.tz(Date.now(), "Asia/Vientiane").utcOffset("+07:00");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    product:{
        type:String,
        ref: 'Products',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    customer:{
        type:String,
        ref: 'Customers'
    },
    createdAt:{
        type:Date,
        default: dateLaos
    },
    updatedAt:{
        type:Date,
        default: dateLaos
    }
})

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;