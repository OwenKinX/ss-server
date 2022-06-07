const router = require('express').Router();
const saleDetail = require('../../models/SaleDetail');
const Sale =  require('../../models/Sale');

router.get('/saledetail/report', (req,res) => {
    saleDetail.aggregate([
        {
            $lookup:{
                from: 'sales',
                localField: 'sale',
                foreignField: 'invoice_no',
                as: 'sale'
            }
        },
        { $unwind: '$sale' },
        {
            $lookup:{
                from: 'products',
                localField: 'product',
                foreignField: 'pro_id',
                as: 'product'
            }
        },
        { $unwind: '$product' },
        {
            $project:{
                _id:1,
                price:1,
                sle_qty:1,
                date: '$sale.date',
                product:'$product.name',
                customer:'$sale.customer',
                employee: '$sale.employee',
                cash: '$sale.cash',
                total:  { $multiply: [ "$price", "$sle_qty" ] }
            },
        },
        
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err })
        }
    })
})

router.get('/sale/report',(req, res) => {
    Sale.aggregate([
        {
            $lookup:{
                from: 'customers',
                localField: 'customer',
                foreignField: 'cus_id',
                as: 'customer'
            }
        },
        { $unwind:'$customer' },
        {
            $lookup:{
                from: 'employees',
                localField: 'employee',
                foreignField: 'emp_id',
                as: 'employee'
            }
        },
        { $unwind:'$employee' },
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err })
        }
    })
})

router.get('/saledetail/amount', (req, res) => {
    saleDetail.aggregate([
        {
            $group:{
                _id: null,
                saleGrandTotal: { $sum: { $multiply: [ "$price", "$sle_qty" ] }}
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