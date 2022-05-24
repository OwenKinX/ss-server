const mongoose =  require('mongoose');
const Schema = mongoose.Schema

const SupplierSchema = new Schema({
    sup_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: [true, "ຫ້າມຂຶ້ນຕົ້ນດ້ວຍເລກສູນ / Dont lead by Zero(0)"],
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        province: String,
        district: String,
        village: String
    }
},{timesstamps:true});

const Supplier = mongoose.model('Suppliers', SupplierSchema);
module.exports = Supplier;