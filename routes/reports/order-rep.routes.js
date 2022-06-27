const router = require('express').Router();
const orderDetail =  require('../../models/OrderDetail');

router.get('/orderdetail/reports', (req, res) => {
    orderDetail.aggregate([
        {
            $lookup:{
                from:'orders',
                localField: 'order_no',
                foreignField: 'order_no',
                as: 'order'
            }
        },
        { $unwind: '$order'},
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
                price: 1,
                qty:1,
                date:'$order.date',
                product: '$product.name',
                employee: '$order.employee',
                status: '$order.status',
                supplier: '$order.supplier'
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err.message })
        }
    })
})

router.get('/orderdetail/report', (req, res) => {
    const startdate = new Date(req.query.startdate);
    const lastdate = new Date(req.query.lastdate);

    orderDetail.aggregate([
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
                from:'orders',
                localField: 'order_no',
                foreignField: 'order_no',
                as: 'order'
            }
        },
        { $unwind: '$order'},
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
                price: 1,
                qty:1,
                date:'$order.date',
                product: '$product.name',
                employee: '$order.employee',
                status: '$order.status',
                supplier: '$order.supplier'
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

router.get('/orders/purchase', (req, res) => {
    orderDetail.aggregate([
        {
            $match:{
                order_no: req.query.order_no
            }
        },
        {
            $lookup:{
                from:'orders',
                localField: 'order_no',
                foreignField: 'order_no',
                as: 'order'
            }
        },
        { $unwind: '$order'},
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
                order_no: 1,
                price: 1,
                qty:1,
                date:'$order.date',
                product: '$product.name',
                employee: '$order.employee',
                status: '$order.status',
                supplier: '$order.supplier'
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err.message })
        } 
    })
})

module.exports = router;