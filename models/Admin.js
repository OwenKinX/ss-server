const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniquevalidator = require("mongoose-unique-validator");

const AdminSchema = new Schema({
    // 2
    name: {
        type: String,
        required: true,
    },
    // 3
    username: {
        type: String,
        required: [true, "ກະລຸນາປ້ອນ Username"],
        unique: true,
    },
    // 4
    phone: {
        type: Number,
        required: true,
    },
    // 5
    email: {
        type: String,
        required: [true, "ກະລຸນາປ້ອນອີເມວ"],
        unique: true
    },
    // 6
    password: {
        type: String,
        required: [true, "ກະລຸນາປ້ອນລະຫັດຜ່ານ"]
    },
    token: {
        type: String,
    },
},{timestamps:true});

AdminSchema.plugin(uniquevalidator);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;