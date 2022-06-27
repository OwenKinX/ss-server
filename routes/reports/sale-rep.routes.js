const router = require('express').Router();
const saleDetail = require('../../models/SaleDetail');
const Sales = require("../../models/Sale")

router.get('/saledetail/reports', (req,res) => {
    saleDetail.aggregate([
        {
            $lookup:{
                from: 'sales',
                localField: 'inv_no',
                foreignField: 'invoice_no',
                as: 'sale'
            }
        },
        { $unwind: '$sale' },
        {
            $lookup:{
                from: 'products',
                localField: 'pro_id',
                foreignField: 'pro_id',
                as: 'product'
            }
        },
        { $unwind: '$product' },
        {
            $lookup:{
                from: 'employees',
                localField: 'sale.employee',
                foreignField: 'emp_id',
                as: 'employee'
            }
        },
        { $unwind: '$employee' },
        {
            $project:{
                _id:1,
                // price:{ $round: [ '$price', -3 ]},
                price: 1,
                qty:1,
                type: '$sale.sale_type',
                date: '$sale.date',
                product:'$product.name',
                customer:'$sale.customer',
                employee: '$sale.employee',
                cash: '$sale.cash'
            },
        }
        
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err.message })
        }
    })
})

router.get('/saledetail/report', (req,res) => {
    const startdate = new Date(req.query.startdate);
    const lastdate = new Date(req.query.lastdate);

    saleDetail.aggregate([
        {
            '$match': {
                'createdAt': {
                  $gte: startdate,
                  $lte: lastdate
                }
            }
        },
        {
            $lookup:{
                from: 'sales',
                localField: 'inv_no',
                foreignField: 'invoice_no',
                as: 'sale'
            }
        },
        { $unwind: '$sale' },
        {
            $lookup:{
                from: 'products',
                localField: 'pro_id',
                foreignField: 'pro_id',
                as: 'product'
            }
        },
        { $unwind: '$product' },
        
        {
            $project:{
                _id:1,
                // price:{ $round: [ '$price', -3 ]},
                price:1,
                qty:1,
                type: '$sale.sale_type',
                date: '$sale.date',
                product:'$product.name',
                customer:'$sale.customer',
                employee: '$sale.employee',
                cash: '$sale.cash'
            },
        },
        
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err.message })
        }
    })
})

router.get('/saledetail/amount', (req, res) => {
    saleDetail.aggregate([
        {
            $group:{
                _id: null,
                saleGrandTotal: { $sum: { $multiply: [ "$price", "$qty" ] }}
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err })
        }
    })
});

// sale receipt
router.get('/sales/receipt', (req,res) => {
    saleDetail.aggregate([
        {
            $match:{
                inv_no: req.query.inv_no
            }
        },
        {
            $lookup:{
                from: 'sales',
                localField: 'inv_no',
                foreignField: 'invoice_no',
                as: 'sale'
            }
        },
        { $unwind: '$sale' },
        
        {
            $lookup:{
                from: 'products',
                localField: 'pro_id',
                foreignField: 'pro_id',
                as: 'product'
            }
        },
        { $unwind: '$product' },
        {
            $project:{
                _id:0,
                inv_no: 1,
                price: 1,
                qty:1,
                date: '$sale.date',
                product:'$product.name',
                customer:'$sale.customer',
                employee: '$sale.employee'
            }
        }
        
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err.message })
        }
    })
});



module.exports = router;