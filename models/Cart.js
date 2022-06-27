const mongoose = require('mongoose');
// const moment = require('moment-timezone');
// const dateLaos = moment.tz(new Date(), "Asia/Vientiane").utcOffset("+07:00");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    pro_id:{
        type:Number,
        ref: 'Products'
    },
    qty:{
        type:Number
    },
    address:{
        type:String
    },
    customer:{
        type:Number,
        ref: 'Customers'
    }
},{timestamps:true})

const Cart = mongoose.model("Carts", CartSchema);
module.exports = Cart;