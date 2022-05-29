const router = require('express').Router();
const Imports = require('../../models/Import')

router.get('/imports/report', (req, res) => {
    Imports.aggregate([
        {
            $lookup:{
                from: 'products',
                localField: 'product',
                foreignField: 'pro_id',
                as: 'product'
            }
        },
        { $unwind:'$product' },
    ]).exec((err, result) => {
        if(err){
            res.status(500).json({ message:err })
        }
        res.status(200).json(result)
    })
})

module.exports = router;