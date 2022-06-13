const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const logger = require("./../../utils/logger");
const Customer = require("./../../models/Customer");

// add
router.post("/customer/add", async (req, res) => {
    try {
        const { cus_id, name, surname, phone, email, password, dob, gender, province, district, village } = req.body;

        if (!req.body) {
            res.status(400).send({ messgae: "[ -- Request body is missing -- ]"});
            logger.error(`${error.status || 400} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }

        const exitUser = await Customer.findOne({ cus_id });
        if (exitUser) {
            return res.status(409).send({ message: "[ -- ມີລະຫັດລູກຄ້ານີ້ໃນລະບົບແລ້ວ / This customer ID is already exit -- ]" });
        }

        hashPassword = await bcrypt.hash(password, 10);

        const customer = await Customer.create({
            cus_id,
            name,
            surname,
            phone,
            email: email.toLowerCase(),
            password: hashPassword,
            dob,
            gender,
            province,
            district,
            village,
        })
        res.status(200).send({ message: "[ -- Data is create successfully -- ]"});
    }
    catch (error) {
        res.status(500).send(error);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get all
router.get("/customers", async (req, res) => {
    try {
        // const customers = await Customer.find({
        //     cus_id: {$ne: 1}
        // }).exec();
        const customers = await Customer.find()
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// get single
router.get("/customer/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// update
router.put("/customer/update/:id",async (req, res) => {
    try {
        const _id = req.params.id;
        const customer = await Customer.findByIdAndUpdate(_id,{
            $set: req.body
        }, {new: true});
        if (customer) {
            res.status(200).send({ message: "[ -- Data is update successfully -- ]"});
        } else {
            res.status(404).send({ message: "[ -- Data is not found -- ]"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

// delete
router.delete("/customer/delete/:id", async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (customer) {
            res.status(200).send({ message: "[ -- Data is delete successfully -- ]"});
        }else{
            res.status(404).send({ message: "[ -- Data is not found -- ]"});
            logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    }
    catch(error){
        res.status(500).send(error);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

module.exports = router;