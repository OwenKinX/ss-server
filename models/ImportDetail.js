const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const ImportDetailSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    pro_id: {
        type: Number,
        ref: 'Products'
    },
    imp_no: {
        type: String,
        ref: 'Imports'
    }
}, {timestamps: true});

const ImportDetails = mongoose.model('ImportDetail', ImportDetailSchema);
module.exports = ImportDetails;