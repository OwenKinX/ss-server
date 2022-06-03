const express = require("express");
const router = express.Router();
const logger = require("./../../utils/logger");
const Product = require("./../../models/Products");
const extractFile = require("./../../middleware/file");

// add
router.post("/product/add", extractFile, (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const image = `${url}/images/${req.file.filename}`;
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
})

router.get('/products/detail', (req, res) => {
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
            $lookup:{
                from: 'product-units',
                localField: 'unit',
                foreignField: 'symbol',
                as: 'unit'
            }
        },
        { $unwind:'$unit' }
    ]).exec((err, result) => {
        if(err){
            res.status(500).json({
                message:err
            })
        }
        res.status(200).json(result)
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

// get single
router.get('/product/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const product = await Product.findOne({_id});
        if (product) {
            res.status(200).send(product)
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
})

// update
router.put('/product/update/:id', extractFile,(req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;
    image = `${url}/images/${req.file.filename}`;
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
        const _id = req.params.id
        const product = await Product.findByIdAndRemove({_id})
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