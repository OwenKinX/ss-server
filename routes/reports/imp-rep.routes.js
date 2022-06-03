const router = require('express').Router();
const Imports = require('../../models/Import')

router.get('/imports/report', (req, res) => {
    Imports.aggregate([
        {
            $lookup:{
                from: 'products',
                localField: 'product',
                foreignField: 'pro_id',
                as: 'product'
            }
        },
        { $unwind:'$product' },
        {
            $lookup:{
                from: 'employees',
                localField: 'employee',
                foreignField: 'emp_id',
                as: 'employee'
            }
        },
        { $unwind:'$employee' },
        {
            $lookup: {
                from: 'orders',
                localField: 'order',
                foreignField: 'order_no',
                as: 'order'
            }
        },
        { $unwind: '$order'},
        {
            $project:{
                _id:1,
                product: '$product.image',
                p_name: '$product.name',
                c_price: 1,
                imp_qty: 1,
                o_date: '$order.date',
                date: 1,
                total: { $multiply: ['$c_price', '$imp_qty'] },
                // totalAmount: { $sum: { $multiply: ['$c_price', '$imp_qty'] } }
            }
        }
    ]).exec((err, result) => {
        if(err){
            res.status(500).json({ message:err })
        }
        res.status(200).json(result)
    })
});

router.get('/imports/amount', (req, res) => {
    Imports.aggregate([
        {
            $group: {
                _id:null,
                totalAmount: { $sum: { $multiply:['$c_price', '$imp_qty'] } }
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err })
        }
    })
})

module.exports = router;