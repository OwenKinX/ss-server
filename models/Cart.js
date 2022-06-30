const mongoose = require('mongoose');
// const moment = require('moment-timezone');
// const dateLaos = moment.tz(new Date(), "Asia/Vientiane").utcOffset("+07:00");

const Schema = mongoose.Schema;

const CartDetailSchema = new Schema({
    pro_id:{
        type:Number,
        ref: 'Products'
    },
    price:{
        type:Number
    },
    qty:{
        type:Number
    },
    cus_id:{
        type:Number,
        ref: 'Customers'
    }
},{timestamps:true})

const Cart = mongoose.model("Carts", CartDetailSchema);
module.exports = Cart;