const express = require("express");
const router = express.Router();

const logger = require("./../../utils/logger")
const Supplier = require('./../../models/Supplier');

// add supplier route
router.post('/supplier/add', async(req, res) => {
    try{
        const { sup_id, name, phone, email, province, district, village } = req.body;
        const exitId = await Supplier.findOne({ sup_id });
        if(exitId){
            return res.status(409).send({ message: "[ -- ມີລະຫັດຜູ້ສະໜອງນີ້ໃນລະບົບແລ້ວ / This supplier ID is already exit -- ]" });
        }
        const supplier = await Supplier.create({
            sup_id,
            name,
            phone,
            email: email.toLowerCase(),
            address: {
                province,
                district,
                village,
            },
        });
        res.status(201).json({ message: "ເພີ່ມຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
    }
    catch(error){
        res.status(500).json(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

// get supplier route
router.get('/suppliers', async(req, res) => {
    try{
        const supplier = await Supplier.find();
        if (supplier) {
            res.status(200).json(supplier)
        }else{
            res.status(404).json({ message: "[ -- ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ / Not found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).json(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get single supplier route
router.get('/supplier/:id', async(req, res) => {
    try{
        const _id = req.params.id
        const supplier = await Supplier.findOne({_id});
        if (supplier) {
            res.status(200).json(supplier)
        }else{
            res.status(404).json({ message: "[ -- ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ / Not found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).json(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// Update supplier route
router.put('/supplier/update/:id', async(req, res) => {
    try{
        const _id = req.params.id;
    
        const supplier = await Supplier.findByIdAndUpdate(_id,{
            $set: req.body
        },{ new: true });
        if (supplier) {
            res.status(200).json({ message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
        }else{
            res.status(404).json({ message: "[ -- ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ / Not found -- ]" });
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).json(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// Delete supplier route
router.delete('/supplier/delete/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const supplier = await Supplier.findByIdAndRemove({_id})
        if (supplier) {
            res.status(200).json({ message: "ລົບຂໍ້ມູນສຳເລັດ [ -- Success -- ]" });
        }else{
            res.status(403).json("ບໍ່ພົບຂໍ້ມູນ // Not Found");
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).json(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

module.exports = router;