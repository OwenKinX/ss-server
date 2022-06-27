const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const logger = require("../utils/logger");
const checkAuth = require("../middleware/auth");
const { restart } = require("nodemon");

require("dotenv").config();

// register route for admin
router.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, 10).then(hashPassword => {
        const user = new Admin({
            name: req.body.name,
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email,
            password: hashPassword
        });
        user.save().then(result => {
            res.status(200).json({result: result, message: "ລົງທະບຽນສຳເລັດ / Success"});
        }).catch(err => {
            res.status(500).json({message: err.message});
        })
    });
});

// login route for admin
router.post("/login", (req, res) => {
    let fetchUser;
    Admin.findOne({ email: req.body.email }).then(user => {
        if(!user) {
            return res.status(404).json({message: "ບໍ່ມີຜູ້ໃຊ້ນີ້ / User not found"});
        }
        fetchUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if(!result) {
            return res.status(409).json({message: "ເຂົ້າສູ່ລະບົບລົ້ມເຫຼວ / Failed to login"});
        }
        const token = jwt.sign(
            { email: fetchUser.email, userId: fetchUser._id },
            process.env.TOKEN_KEY,
            { expiresIn: "8h" }
        )
        return res.status(200).json(
            {   
                user: fetchUser._id,
                result: result, 
                token: token,
                expiresIn: 28800 
            }
        );
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
});

// get admin profile
router.get("/profile/:id", async (req, res) => {
    const _id = req.params.id;
    Admin.findById(_id).then(admin => {
        if(!admin) {
            return res.status(404).json({message: "ບໍ່ມີຜູ້ໃຊ້ນີ້ / User not found"});
        }
        res.status(200).json(admin);
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
})

// Update profile route
router.put("/profile/update/:id", (req, res) => {
    const _id = req.params.id
    const { name, username, phone, email } = req.body;

    Admin.findByIdAndUpdate(_id,{
        $set: {
            name,
            username,
            phone,
            email: email.toLowerCase()
        }
    }, { new: true }).then(admin => {
        if(!admin) {
            return res.status(404).json({message: "ບໍ່ມີຜູ້ໃຊ້ນີ້ / User not found"});
        }
        res.status(200).json(admin);
    }).catch(err => {
        res.status(500).json({message: err.message});
    });
});

// update user password
router.patch("/update/password", async (req, res) => {
    try {
        await bcrypt.hash(req.body.password, 10).then(hashPassword => {
            const admin = Admin.updateOne(req.body.email, {
                $set: { password: hashPassword }
            })
            res.status(200).json({message: "ແກ້ໄຂລະຫັດຜ່ານສຳເລັດ / Success"})
        })
    } catch (error) {
        res.status(500).json(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

module.exports = router;
