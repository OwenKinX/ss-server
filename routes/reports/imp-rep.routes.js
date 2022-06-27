const router = require('express').Router();
const ImportDetail = require('../../models/ImportDetail')

router.get('/imports/reports', (req, res) => {
    ImportDetail.aggregate([
        {
            $lookup:{
                from: 'products',
                localField: 'pro_id',
                foreignField: 'pro_id',
                as: 'product'
            }
        },
        { $unwind:'$product' },
        {
            $lookup: {
                from: 'imports',
                localField: 'imp_no',
                foreignField: 'imp_no',
                as: 'import'
            }
        },
        { $unwind: '$import'},
        {
            $lookup:{
                from: 'orders',
                localField: 'import.order_no',
                foreignField: 'order_no',
                as: 'order',
            }
        },
        { $unwind: '$order'},
        {
            $project:{
                _id:0,
                product: '$product.image',
                p_name: '$product.name',
                date: '$import.date',
                order_date: '$order.date',
                price: 1,
                qty: 1
            }
        }
    ]).exec((err, result) => {
        if(err){
            res.status(500).json({ message:err.message });
        }
        res.status(200).json(result)
    })
});

router.get('/imports/report', (req, res) => {
    const date = new Date(req.query.date);

    ImportDetail.aggregate([
        {
            $match:{
                createdAt:{ $gte: date }
            }
        },
        {
            $lookup:{
                from: 'products',
                localField: 'pro_id',
                foreignField: 'pro_id',
                as: 'product'
            }
        },
        { $unwind:'$product' },
        {
            $lookup: {
                from: 'imports',
                localField: 'imp_no',
                foreignField: 'imp_no',
                as: 'import'
            }
        },
        { $unwind: '$import'},
        {
            $lookup:{
                from: 'orders',
                localField: 'import.order_no',
                foreignField: 'order_no',
                as: 'order',
            }
        },
        { $unwind: '$order'},
        {
            $project:{
                _id:0,
                product: '$product.image',
                p_name: '$product.name',
                date: '$import.date',
                order_date: '$order.date',
                price: 1,
                qty: 1
            }
        }
    ]).exec((err, result) => {
        if(err){
            res.status(500).json({ message:err.message });
        }
        res.status(200).json(result)
    })
});

module.exports = router;