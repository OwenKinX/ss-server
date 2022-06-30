const router = require("express").Router();
const logger = require("../../utils/logger");
const Cart = require("../../models/Cart");

router.post('/cart/add', (req,res) => {
    
    Cart.insertMany(
        req.body
    ).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
});

router.get('/cart/users', (req,res) => {
    Cart.aggregate([
        {
            $lookup:{
                from: 'products',
                localField: 'pro_id',
                foreignField: 'pro_id',
                as: 'product'
            },
        },
        { $unwind:'$product' },
        {
            $lookup:{
                from: 'customers',
                localField: 'cus_id',
                foreignField: 'cus_id',
                as: 'customer'
            }
        },
        { $unwind: '$customer' },
        {
            $project:{
                _id:1,
                product: '$product.pro_id',
                p_name: '$product.name',
                price:'$product.price',
                qty:1,
                address:{
                    province:'$customer.province',
                    district:'$customer.district',
                    village:'$customer.village'
                },
                customer: '$customer.cus_id',
                c_name: '$customer.name',
                c_tel: '$customer.phone',
                c_email:'$customer.email',
                createdAt:1
            }
        }
    ]).exec((err, result) => {
        if(err){
            res.status(500).json({ message:err.message });
        }
        res.status(200).json(result)
    })
})

router.get('/cart/user', (req,res) => {

    const id = Number(req.query.id);

    Cart.aggregate([
        {
            $match:{
                cus_id: id
            }
        },
        {
            $lookup:{
                from: 'customers',
                localField: 'cus_id',
                foreignField: 'cus_id',
                as: 'customer'
            }
        },
        { $unwind: '$customer' },
        {
            $project:{
                _id:0,
                c_id: '$customer.cus_id',
                c_name: '$customer.name',
                c_tel: '$customer.phone',
                c_email:'$customer.email',
                c_address:{
                    province:'$customer.province',
                    district:'$customer.district',
                    village:'$customer.village'
                },
            }
        }
    ]).exec((err, result) => {
        if(err){
            res.status(500).json({ message:err.message });
        }
        res.status(200).json(result)
    })
})

router.delete('/cart/delete/:id', (req, res) => {
    const cus_id = req.params.id;
    Cart.deleteMany({cus_id}).then(result => {
        res.status(200).json({
            message: "ຂໍ້ມູນໄດ້ຖືກລິບແລ້ວ"
        });
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`); 
    })
})

module.exports = router;