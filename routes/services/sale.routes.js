const express = require("express");
const router = express.Router();
const logger = require("./../../utils/logger");
const Sales = require("./../../models/Sale");

// add sale data
router.post('/sales/add', (req, res) => {
    Sales.create(
        req.body
    ).then(result => {
        res.status(200).json({
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດ"
        });
    }).catch(err => {
        res.status(500).json({
            error: {err, message: err.message}
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

// get all sale data
router.get('/sales', async(req, res) => {
    try{
        const sales = await Sales.find();
        if(sales){
            res.status(200).json(sales);
        }else{
            res.status(404).json({ message: "[ -- ບໍ່ພົບຂໍ້ມູນຂາຍ / No sale found -- ]"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }catch(err){
        res.status(500).json(err.message);
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

// get single sale data
router.get('/sales/:id', async(req, res) => {
    try{
        const _id = req.params.id
        const sale = await Sales.findById({_id});
        if(sale){
            res.status(200).json(sale);
        }else{
            res.status(404).json({ message: "[ -- ບໍ່ພົບຂໍ້ມູນຂາຍ / No sale found -- ]"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }catch(err){
        res.status(500).json(err.message);
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

// update sale data
router.put('/sales/update/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const sales = await Sales.findByIdAndUpdate(_id, {
            $set: req.body
        });
        if(sales){
            res.status(200).json(sales);
        }else{
            res.status(404).json({ message: "[ -- ບໍ່ພົບຂໍ້ມູນຂາຍ / No sale found -- ]"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }catch(err){
        res.status(500).json(err.message);
        console.log(err);
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

router.delete('/sales/delete/:id', (req, res) => {
    const _id = req.params.id;
    Sales.findByIdAndRemove({_id}).then(result => {
        res.status(200).json({
            message: "ລົບຂໍ້ມູນສຳເລັດ"
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${ err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

module.exports = router;