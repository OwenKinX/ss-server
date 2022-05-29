const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    product:{
        type:String,
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
    date:{
        type:Date,
        default: dateThailand
    },
    address:{
        type:String,
        required:true
    },
    customer:{
        type:String,
        ref: 'Customers'
    }
})

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;