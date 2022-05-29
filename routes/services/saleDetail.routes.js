const express = require("express");
const router = express.Router();
const logger = require("./../../utils/logger");
const SaleDetail = require("./../../models/SaleDetail");

// add sale detail data
router.post("/saledetail/add", (req, res) => {
    const saleDetail = new SaleDetail({
        sle_qty: req.body.sle_qty,
        price: req.body.price * 1.06,
        product: req.body.product,
        sale: req.body.sale
    });
    saleDetail.save().then(result => {
        res.status(200).json({
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດ"
        });
    }).catch(err => {
        res.status(500).json({
        error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

// get all sale detail data
router.get("/saledetail", (req, res) => {
    SaleDetail.find().then(saleDetail => {
        res.status(200).json(saleDetail);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

// get single sale detail data
router.get("/saledetail/:id", (req, res) => {
    const _id = req.params.id;
    SaleDetail.findById({_id}).then(saleDetail => {
        res.status(200).json(saleDetail);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

// update sale detail data
router.put("/saledetail/update/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const saleDetail = await SaleDetail.findByIdAndUpdate(_id,{
            $set: {
                sle_qty: req.body.sle_qty,
                price: req.body.price + 1000,
                product: req.body.product,
                sale: req.body.sale
            }
        }, {new: true});
        if(saleDetail){
            res.status(200).json({ message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ" });
        }
    }catch(err){
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

// delete sale detail data
router.delete("/saledetail/delete/:id", (req, res) => {
    const _id = req.params.id;
    SaleDetail.findByIdAndRemove(_id).then(saleDetail => {
        res.status(200).json({ message: "ລົບຂໍ້ມູນສຳເລັດ" });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

module.exports = router;