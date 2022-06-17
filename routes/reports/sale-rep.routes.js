const router = require('express').Router();
const saleDetail = require('../../models/SaleDetail');
const Sale =  require('../../models/Sale');
const moment  = require('moment')

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
    const date = new Date(req.query.saledate);
    // console.log(date);
    saleDetail.aggregate([
        {
            '$match': {
                'createdAt': {
                //   '$gte': new Date('Tue, 15 Jun 2022 00:00:00 GMT')
                  '$gte': date
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
                cash: '$sale.cash',
                total: { $multiply: [ "$price", "$qty" ] }
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
})

module.exports = router;