const express = require("express");
const router = express.Router();
const logger = require("./../../utils/logger");
const Employees =  require("./../../models/Employees");
const extractFile = require("./../../middleware/file");

// add
router.post('/emp/add', extractFile, async(req, res) => {
    try {
        const { emp_id, name, surname, gender, dob, phone, email, province, district, village, position } = req.body;
        const url = `${req.protocol}://${req.get('host')}`;
        const image = `${url}/images/${req.file.filename}`;

        const exitEmp = await Employees.findOne({ emp_id });
        if (exitEmp) {
            return res.status(409).json({ message: "ມີລະຫັດພະນັກງານນີ້ໃນລະບົບແລ້ວ / This emp_id is already exits"});
        }
        const emp = await Employees.create({
            emp_id,
            name,
            surname,
            gender,
            dob,
            phone,
            email: email.toLowerCase(),
            province,
            district,
            village,
            position,
            image
        });
        
        res.status(200).json({ message: "ບັນທຶກຂໍ້ມູນສຳເລັດ | Successfully"});
    }
    catch (error) {
        res.status(500).json(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get
router.get('/employees', async(req, res) => {
    try{
        const emp = await Employees.find();
        if (emp) {
            res.status(200).send(emp)
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ / Not found"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get single
router.get('/employee/:id', async(req, res) => {
    try{
        const _id = req.params.id
        const emp = await Employees.findOne({_id});
        if (emp) {
            res.status(200).send(emp)
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ / Not found"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// update
router.put('/emp/update/:id', async(req, res) => {
    try{
        const _id = req.params.id;
        const url = `${req.protocol}://${req.get('host')}`;
        const image = req.file;

        if(typeof req.file === "undefined"){
            image = `${url}/images/avatar.png`;
        }else{
            image = `${url}/images/${req.file.filename}`;
        }

        const emp = await Employees.findByIdAndUpdate(_id,{
            $set: req.body, image
        },{new: true});
        if (emp) {
            res.status(200).send({ message: "ອັບເດດຂໍ້ມູນສຳເລັດ / Successfully"});
        }else{
            res.status(404).send({ message: "ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ / Not found"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// delete
router.delete('/emp/delete/:id', async(req, res) => {
    try{
        const _id = req.params.id
        const emp = await Employees.findByIdAndRemove({_id})
        if (emp) {
            res.status(200).send(emp)
        }else{
            res.status(403).send("ບໍ່ພົບຂໍ້ມູນ // Not Found");
            logger.error(`403 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${ error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

module.exports = router;