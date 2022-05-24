const express = require("express");
const router = express.Router();

const logger = require("./../../utils/logger");
const Types = require("./../../models/Types");

// add category type route
router.post('/type/add', async(req, res) => {
    try{
        const { pt_id, name, name_en, category } = req.body;
        const type = await Types.create({
            pt_id, name,name_en,category
        });
        res.status(200).send({ message: "ເພີ່ມຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
    }
    catch(error) {
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get all category type
router.get('/types', async(req, res) => {
    try{
        const type = await Types.find();
        if (type) {
            res.status(200).send(type);
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Types Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get single category type
router.get('/type/:id', async(req, res) => {
    try{
        const _id = req.params.id
        const type = await Types.findOne({_id});
        if (type) {
            res.status(200).send(type);
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Types Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// update category type
router.put('/type/update/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const type = await Types.findByIdAndUpdate(_id,{
            $set: req.body
        })
        if (type) {
            res.status(200).send({ message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ [ -- Update Success -- ]" });
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Types Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// delete category type
router.delete('/type/delete/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const type = await Types.findByIdAndRemove({_id})
        if (type) {
            res.status(200).send({ message: "ລຶບຂໍ້ມູນສຳເລັດ [ -- Delete Success -- ]" });
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Types Found -- ]" });
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