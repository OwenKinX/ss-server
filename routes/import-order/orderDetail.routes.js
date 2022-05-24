const express = require("express");
const router = express.Router();
const logger = require("./../../utils/logger");
const OrderDetail = require("./../../models/OrderDetail");

// add order detail data
router.post("/orderDetail/add", (req, res) => {
    const orderDetail = new OrderDetail({
        ord_qty: req.body.ord_qty,
        price: req.body.price,
        product: req.body.product,
        order: req.body.order
    })
    orderDetail.save().then(result => {
        res.status(200).json({
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດ"
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
});

// get all order detail data
router.get("/orderDetail", (req, res) => {
    OrderDetail.find().then(orderDetail => {
        res.status(200).json(orderDetail);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

// get single order detail data
router.get("/orderDetail/:id", (req, res) => {
    const _id = req.params.id;
    OrderDetail.findById({ _id }).then(orderDetail => {
        res.status(200).json(orderDetail);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

// update order detail data
router.put("/orderDetail/update/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const orderDetail = await OrderDetail.findByIdAndUpdate(_id, {
            $set: req.body
        }, { new: true });
        if (orderDetail) {
            res.status(200).json({ message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ" });
        }
    } catch (err) {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

// delete order detail data
router.delete("/orderDetail/delete/:id", (req, res) => {
    const _id = req.params.id;
    OrderDetail.findByIdAndRemove(_id).then(orderDetail => {
        res.status(200).json({ message: "ລົບຂໍ້ມູນສຳເລັດ" });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

module.exports = router;