const express = require("express");
const router = express.Router();

const Category = require("./../../models/Categories");
const logger = require("./../../utils/logger");

// add
router.post("/category/add", async (req, res) => {
    try{
        const { pc_id, name, name_en } = req.body;
        const category = await Category.create({
            pc_id,
            name,
            name_en
        });
        res.status(201).send({ message: "ເພີ່ມຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get all
router.get("/categories", async (req, res) => {
    try{
        const categories = await Category.find();
        if (categories) {
            res.status(200).send(categories)
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Categories Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get single
router.get("/category/:id", async (req, res) => {
    try{
        const category = await Category.findById(req.params.id);
        if (category) {
            res.status(200).send(category)
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Categories Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// update
router.put("/category/update/:id", async (req, res) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true});
        if (category) {
            res.status(200).send({ message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Categories Found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// detele
router.delete("/category/delete/:id", async (req, res) => {
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        if (category) {
            res.status(200).send({ message: "ລົບຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນ [ -- Not Categories Found -- ]" });
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