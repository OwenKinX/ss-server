const express = require("express");
const router = express.Router();

const logger = require("./../../utils/logger");
const Position = require("./../../models/Position")

// add position data
router.post('/position/add', async(req, res) => {
    try{
        const { ep_id, name, name_en } = req.body;
        const position = await Position.create({ ep_id, name, name_en });
        res.status(201).send({ message: "ເພີ່ມຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

//get position 
router.get('/positions', async(req, res) => {
    try{
        const positions = await Position.find();
        if (positions) {
            res.status(200).send(positions);
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Position Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get single position
router.get('/position/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const position = await Position.findOne({_id});
        if (position) {
            res.status(200).send(position);
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Position Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// update position route
router.put('/position/update/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const position = await Position.findByIdAndUpdate(_id,{
            $set: req.body
        },{new: true});
        if (position) {
            res.status(200).send({ message:"ແກ້ໄຂຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
        }else{
            res.status(404).send({ message:"ບໍ່ພົບຂໍ້ມູນ | Not Found" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// delete position
router.delete('/position/delete/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const position = await Position.findByIdAndRemove({_id})
        if (position) {
            res.status(200).send({ message: "ລົບຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

module.exports = router;