const router = require("express").Router();
const Sale = require("../../models/Sale");
const SaleDetail = require("../../models/SaleDetail");

router.post('/sales/save', async(req, res) => {
    try {
        const sales = await Sale.create(req.body);  

        const saledetail = await SaleDetail.insertMany(req.body);

        res.status(200).json({
            sales: sales,
            detail: [
                saledetail
            ]
        });   
    } catch(err) {
        res.status(500).json({
            error: {err, message: err.message}
        });
    }
     
})

module.exports = router;