const router = require('express').Router();
const Product = require('../../models/Products');

router.get('/products/reports', (req, res) => {
    Product.aggregate([
        {
            $lookup:{
                from: 'product-types',
                localField: 'type',
                foreignField: 'pt_id',
                as: 'type'
            },
        },
        { $unwind: '$type' },
        {
            $project:{
                _id:1,
                name:1,
                price:1,
                stock_qty:1,
                type: '$type.name',
                total: { $multiply: ['$price', '$stock_qty'] },
                image:1
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

router.get('/products/report', (req, res) => {
    const type = req.query.type;
    Product.aggregate([
        {
            $match: {
                type: type
            }
        },
        {
            $lookup:{
                from: 'product-types',
                localField: 'type',
                foreignField: 'pt_id',
                as: 'type'
            },
        },
        { $unwind: '$type' },
        {
            $project:{
                _id:1,
                name:1,
                price:1,
                stock_qty:1,
                type: '$type.name',
                total: { $multiply: ['$price', '$stock_qty'] },
                image:1
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

router.get('/products/amount', (req,res) =>{
    Product.aggregate([
        {
            $group:{
                _id:null,
                productGrandTotal: { $sum: { $multiply: ['$price', '$stock_qty']} }
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

router.get('/income-expanse', (req, res) => {

})

module.exports = router;