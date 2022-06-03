const router = require("express").Router();
const logger = require("../../utils/logger");
const Cart = require("../../models/Cart")

router.post('/cart/add', (req,res) => {
    const cart = new Cart({
        product: req.body.product,
        price: req.body.price,
        qty: req.body.qty,
        address: req.body.address,
        customer: req.body.customer,
    });
    cart.save().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
});

router.get('/cart', (req, res) => {
    Cart.find().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
})

router.get('/cart/:customer', (req, res) => {
    Cart.findOne({customer: req.params.customer}).then(cart => {
        res.status(200).json(cart);
    }).catch(err => {
        res.status(500).json({
            error:err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
})

router.delete('/cart/delete/:id', (req, res) => {
    const _id = req.params.id;
    Cart.findByIdAndRemove({_id}).then(result => {
        res.status(200).json({
            message: "ຂໍ້ມູນໄດ້ຖືກລິບແລ້ວ"
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`); 
    })
})

module.exports = router;