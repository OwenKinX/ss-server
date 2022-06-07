const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const logger = require("../utils/logger");
const checkAuth = require("../middleware/auth");

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
            { expiresIn: "2h" }
        )
        return res.status(200).json({ result: result, token: token, expiresIn: 7200 });
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
});

// get admin profile
router.get("/profile/:id", checkAuth, async (req, res) => {
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
router.put("/update/:id", checkAuth, async (req, res) => {
    const _id = req.params.id
    const { name, username, phone, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(password, salt);

    Admin.findByIdAndUpdate(_id,{
        $set: {
            name,
            username,
            phone,
            email: email.toLowerCase(),
            password: hashPassword
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
router.patch("/password-update/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const admin = await Admin.findOne({ username });

        if( username == admin.username ){
            const new_password = Admin.updateOne({ password })
            res.status(200).json(new_password)
        } else {
            res.status(401).json("ຊື່ຜູ້ໃຊ້ບໍ່ມີໃນຖານຂໍ້ມູນ / Dont have this username in database")
        }
        
    } catch (error) {
        res.status(500).json(error.message);
        console.log(error);
        logger.error(`${error.status || 500} - ${res.statusMessage} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

module.exports = router;
