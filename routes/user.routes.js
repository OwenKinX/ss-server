const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Customer = require("../models/Customer");
const checkAuth = require("../middleware/auth");
const logger = require("../utils/logger");

const router = express.Router();

router.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, 10).then(hashPassword => {
        const user = new Customer({
            name: req.body.name,
            surname: req.body.surname,
            phone:  req.body.phone,
            email: req.body.email,
            password: hashPassword,
            dob: req.body.dob,
            gender: req.body.gender,
            province: req.body.province,
            district: req.body.district,
            village: req.body.village
        });
        user.save().then(result => {
            res.status(200).json({result: result, message: "ລົງທະບຽນສຳເລັດ | Success"});
        }).catch(err => {
            res.status(500).json({message: err.message});
        })
    })
});

router.post("/login", (req, res) => {
    let fetchUser;
    Customer.findOne({ email: req.body.email}).then(user => {
        if(!user) { return res.status(404).json({message: "ບໍ່ມີຜູ້ໃຊ້ນີ້ / User not found"}); }
        fetchUser = user;
        return bcrypt.compare(req.body.password, user.password)
    }).then(result => {
        if(!result) { return res.status(409).json({message: "ເຂົ້າສູ່ລະບົບລົ້ມເຫຼວ / Failed to login"}); }
        const token = jwt.sign(
            { email: fetchUser.email, userId: fetchUser._id },
            process.env.TOKEN_KEY,
            { expiresIn: "8h" }
        )
        return res.status(200).json(
            {
                user: fetchUser.cus_id,
                token: token,
                expiresIn: 28800
            }
        );
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
});

router.get("/profile/:id", (req, res) => {
    const cus_id = req.params.id
    Customer.findOne({ cus_id }).then(user => {
        if(!user) { return res.status(4004).json({message: "ບໍ່ພົບບັນຊີນີ້ໃນລະບົບ / Can not find this user in database"}); }
        return res.status(200).json(user);
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
});

router.put('/update/:id', async(req, res) => {
    try{
        const { name, surname, phone, email, password, dob, gender, province, district, village } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
        const cus_id = req.params.id

        const user = await Customer.findByIdAndUpdate(
            cus_id, {
                $set: { name, surname, phone, email: email.toLowerCase(), password: hashPassword, dob, gender, province, district, village }
            },
            { new: true }
        )
        res.status(200).send({ message: "ອັບເດດຂໍ້ມູນສຳເລັດ / Update success" });
    }catch(error){
        res.status(500).send(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

module.exports = router;