const express = require("express");
const router = express.Router();
const logger = require("./../../utils/logger");
const Order = require("./../../models/Order");

// add order data
router.post('/order/add', (req, res) =>{
    const order = new Order({
        order_no: req.body.order_no,
        status: req.body.status,
        date: req.body.date,
        employee: req.body.employee,
        supplier: req.body.supplier
    });
    order.save().then(result => {
        res.status(200).json({
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດ"
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${ err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

// get all order data
router.get('/order', (req, res) => {
    Order.find().then(order => {
        res.status(200).json(order);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${ err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

// get single order data
router.get('/order/:id', (req, res) => {
    const _id = req.params.id;
    Order.findById({_id}).then(order => {
        res.status(200).json(order);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${ err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

// update order data
router.put('/order/update/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const order = await Order.findByIdAndUpdate(_id,{
            $set:req.body
        }, {new: true});
        if(order){
            res.status(200).json(order);
        }else{
            res.status(404).json({ message: "[ -- ບໍ່ພົບຂໍ້ມູນການສັ່ງຊື້ / No order found -- ]"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }catch(err){
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${ err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

// delete order data
router.delete('/order/delete/:id', (req, res) => {
    const _id = req.params.id;
    Order.findByIdAndRemove(_id).then(order => {
        if(order){
            res.status(200).json({
                message: "ລົບຂໍ້ມູນສຳເລັດ"
            });
        }else{
            res.status(404).json({ message: "[ -- ບໍ່ພົບຂໍ້ມູນການສັ່ງຊື້ / No order found -- ]"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${ err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

module.exports = router;