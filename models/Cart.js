const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateLaos = moment.tz(new Date(), "Asia/Vientiane").utcOffset("+07:00");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    product:{
        type:Number,
        ref: 'Products',
        required:true,
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
        type:Number,
        ref: 'Customers',
        required:true
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

const Cart = mongoose.model("Carts", CartSchema);
module.exports = Cart;