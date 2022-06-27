const express = require("express");
const router = express.Router();
const logger = require("./../../utils/logger");
const Import = require("./../../models/Import");
const ImportDetail = require("../../models/ImportDetail");

// add import data
router.post("/imports/add", (req, res) => {
    Import.create(
        req.body
    ).then(result => {
        res.status(200).json({
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດ"
        });
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

router.post("/importdetail/add", (req, res) => {
    ImportDetail.insertMany(
        req.body
    ).then(result => {
        res.status(200).json({
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດ"
        });
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

// get all import data
router.get("/imports", (req, res) => {
    Import.find().then(imports => {
        res.status(200).json(imports);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

// get single import data
router.get("/imports/:id", (req, res) => {
    const _id = req.params.id;
    Import.findById({ _id }).then(imports => {
        res.status(200).json(imports);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

// get single import data
router.get("/importdetail/:imp_no", (req, res) => {
    const imp_no = req.params.imp_no;
    ImportDetail.find({ imp_no }).then(imports => {
        res.status(200).json(imports);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
});

// update import data
router.put("/imports/update/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const imports = await Import.findByIdAndUpdate(_id, {
            $set: req.body
        }, { new: true });
        if (imports) {
            res.status(200).json({ message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ" });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

// delete import data
router.delete("/imports/delete/:id", (req, res) => {
    const _id = req.params.id;

    Import.findByIdAndRemove(_id).then(imports => {
        res.status(200).json({ message: "ລົບຂໍ້ມູນສຳເລັດ" });
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})

// delete import data
router.delete("/importdetail/delete/:id", (req, res) => {
    const imp_no = req.params.id;

    ImportDetail.deleteMany({imp_no}).then(imports => {
        res.status(200).json({ message: "ລົບຂໍ້ມູນສຳເລັດ" });
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
})


module.exports = router;