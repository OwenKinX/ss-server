const express = require("express");
const router = express.Router();
const logger = require("./../../utils/logger");
const OrderDetail = require("./../../models/OrderDetail");

// add order detail data
router.post("/orderDetail/add", (req, res) => {
    OrderDetail.insertMany(
        req.body
    ).then(result => {
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

// get order detail data by order_no
router.get("/orderDetail/:order_no", (req, res) => {
    const order_no = req.params.order_no;
    OrderDetail.find({order_no}).then(orderDetail => {
        res.status(200).json(orderDetail);
    }).catch(err => {
        res.status(500).json({
            error: err.message
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

// delete order detail single data
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
});

// delete by drder_no
router.delete("/orderDetail/deletes/:order_no", (req, res) => {
    const order_no = req.params.order_no;
    OrderDetail.deleteMany({order_no}).then(result => {
        res.status(200).json({ message: "ລົບຂໍ້ມູນສຳເລັດ" });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

module.exports = router;