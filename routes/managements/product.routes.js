const express = require("express");
const router = express.Router();
const logger = require("./../../utils/logger");
const Product = require("./../../models/Products");
const extractFile = require("./../../middleware/file");
const fs = require('fs');
const { default: mongoose } = require("mongoose");

// add
router.post("/product/add", extractFile, (req, res) => {
    let image = req.body.image
    if(req.file){
        const url = `${req.protocol}://${req.get('host')}`;
        image = `${url}/images/${req.file.filename}`;
    }
    const product = new Product({
        pro_id: req.body.pro_id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock_qty: req.body.stock_qty,
        type: req.body.type,
        unit: req.body.unit,
        image: image
    });
    product.save().then(result => {
        res.status(200).json({ 
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດ"
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${ err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

// get all
router.get('/products', async(req, res) => {
    try {
        const product = await Product.find();
        if (product) {
            res.status(200).json(product);
        }else{
            res.status(404).json({ message: "[ -- ບໍ່ພົບຂໍ້ມູນສິນຄ້າ / No product found -- ]"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

// for report product
router.get('/products/sales', (req, res) => {
    Product.aggregate([
        {
            $project:{
                _id:0,
                pro_id: 1,
                name: 1,
                price: 1,
                description: 1,
                stock_qty:1,
                image: 1
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result)
        }else{
            res.status(500).json({
               error: err,
               message: err.message
            })
        }
    })
});

// 
router.get('/product/sale', (req, res) => {
    const pro_id = Number(req.query.pro_id);
    Product.aggregate([
        {
            $match: {
                pro_id: pro_id
            }
        },
        {
            $project:{
                _id:0,
                pro_id: 1,
                name: 1,
                price: 1,
                description: 1,
                stock_qty:1,
                image: 1
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result)
        }else{
            res.status(500).json({
               error: err,
               message: err.message
            })
        }
    })
});

// for report product
router.get('/products/sale', (req, res) => {
    Product.aggregate([
        {
            $match:{
                type: req.query.type
            }
        },
        {
            $project:{
                _id:0,
                pro_id: 1,
                name: 1,
                price: 1,
                description: 1,
                stock_qty:1,
                image: 1
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result)
        }else{
            res.status(500).json({
               error: err,
               message: err.message
            })
        }
    })
});

// get product to order
router.get('/products/order', (req, res) => {
    Product.aggregate([
        {
            $project:{
                _id:0,
                pro_id: 1,
                name: 1,
                price: 1,
                description: 1,
                stock_qty:1,
                image: 1
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result)
        }else{
            res.status(500).json({
               error: err,
               message: err.message
            })
        }
    })
});

router.get('/products/sum/stock', async(req,res) => {
    try {
        const product = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$stock_qty" }
                }
            }
        ]);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get single in collection
router.get('/product/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const product = await Product.findOne({_id});
        if (product) {
            res.status(200).send(product);
        }else{
            res.status(404).send({ message: "[ -- ບໍ່ພົບຂໍ້ມູນສິນຄ້າ / No product found -- ]"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

// get all product data 
router.get('/products/info', (req, res) => {
    // const _id = mongoose.Types.ObjectId(req.query.id);
    const _id = new mongoose.Types.ObjectId(req.query.id);
    Product.aggregate([
        {
            $match:{
                _id: _id
            }
        },
        {
            $lookup:{
                from: 'product-types',
                localField: 'type',
                foreignField: 'pt_id',
                as: 'type'
            }
        },
        { $unwind: '$type' },
        {
            $lookup:{
                from: 'product-categories',
                localField: 'type.category',
                foreignField: 'pc_id',
                as: 'category'
            }
        },
        { $unwind: '$category' },
        {
            $project:{
                _id: 1,
                pro_id: 1,
                name: 1,
                price: 1,
                description: 1,
                stock_qty: 1,
                image: 1,
                type: '$type.name',
                category: '$category.name'
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result)
        }else{
            res.status(500).json({
               error: err,
               message: err.message
            })
        }
    });
})


// update
router.put('/product/update/:id', extractFile,(req, res) => {
    let image = req.body.image
    if(req.file){
        const url = `${req.protocol}://${req.get('host')}`;
        image = `${url}/images/${req.file.filename}`;
    }
    const product = Product.findByIdAndUpdate(
        {_id: req.params.id},
        {
            $set: {
                pro_id: req.body.pro_id,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                stock_qty: req.body.stock_qty,
                type: req.body.type,
                unit: req.body.unit,
                image: image
            }
        },
        {new: true}
    ).then(result => {
        if(result){
            res.status(200).json({
                message: "Product updated successfully."
            });
        }else{
            res.status(401).json({
                message: "Product not found."
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${ err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

// delete
router.delete('/product/delete/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const product = await Product.findByIdAndRemove({_id});
        
        const imageRes = product.image;
        console.log(imageRes.replace('http://localhost:8001/images/',''));
        fs.unlinkSync(`${__dirname}/public/images/${imageRes}`, (err) => {
            if(err){
                err.message = "Can not delete image"
                res.status(500).json({ err });
                return;
            }
            console.log("Image Delete Successfully");
        });

        if (product) {
            res.status(200).send({ message: "[ -- ລົບຂໍ້ມູນສິນຄ້າສຳເລັດ | Product deleted successfully -- ]", product });
        }else{
            res.status(403).send({ message: "[ -- ບໍ່ພົບຂໍ້ມູນສິນຄ້າ | No product found -- ]"});
            logger.error(`403 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

module.exports = router;