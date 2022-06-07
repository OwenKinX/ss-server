const router = require('express').Router();
const Product = require('../../models/Products');
const Type =  require('../../models/Types');
const Category = require('../../models/Categories');
const Unit = require('../../models/Units');

router.get('/products/report', (req, res) => {
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
})

module.exports = router;