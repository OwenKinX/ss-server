const express = require("express");
const router = express.Router();

const logger = require("./../../utils/logger");
const Unit = require("./../../models/Units");

// add unit route
router.post('/unit/add', (req, res) => {
    try{
        const { symbol, name, name_en } = req.body;
        const unit = Unit.create({ symbol, name, name_en });
        res.status(201).send({ message: "ເພີ່ມຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get all unit
router.get('/units', async(req, res) => {
    try{
        const units = await Unit.find();
        if (units) {
            res.status(200).send(units)
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Units Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get single unit
router.get('/unit/:id', async(req, res) => {
    try{
        const _id = req.params.id
        const unit = await Unit.findOne({_id});
        if (unit) {
            res.status(200).send(unit)
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Unit Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// update unit
router.put('/unit/update/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const unit = await Unit.findByIdAndUpdate(_id,{
            $set: req.body
        })
        if (unit) {
            res.status(200).send({ message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Units Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// delete unit
router.delete('/unit/delete/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const unit = await Unit.findByIdAndRemove({_id})
        if (unit) {
            res.status(200).send({ message: "ລຶບຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
        }else{
            res.status(403).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Units Found -- ]" });
            logger.error(`403 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

module.exports = router;