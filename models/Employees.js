const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeesSchema = new Schema({
    emp_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    province: String,
    district: String,
    village: String,
    position: {
        type: String,
        ref: "Emp-Positions",
        required: true,
    },
    image: String
},{timestamps:true});

const Employees = mongoose.model("Employees", EmployeesSchema);
module.exports = Employees;
