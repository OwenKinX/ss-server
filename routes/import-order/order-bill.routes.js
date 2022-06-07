const router  = require('express').Router();
const OrderBill =  require('../../models/OrderBill');
const logger = require("../../utils/logger");

router.post('/order/bill/add', (req, res) => {
    const bill = new OrderBill({
        bill_no: req.body.bill_no,
        product: req.body.product,
        qty: req.body.qty,
        supplier: req.body.supplier,
        employee: req.body.employee
    });
    bill.save().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
});

router.get('/order/bill', (req, res) => {
    OrderBill.find().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    })
})

module.exports = router;