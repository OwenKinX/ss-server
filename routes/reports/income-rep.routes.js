const router = require('express').Router();
const SaleDetail = require('../../models/SaleDetail');
const logger = require('../../utils/logger');

router.get('/income/report', async(req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try{
        const income = await SaleDetail.aggregate([
            {
                $match:{
                    createdAt:{ $gte:prevMonth }
                }
            },
            {
                $project:{
                    month:{ $month: '$createdAt' },
                    total:{ $multiply: ['$price', '$sle_qty'] },
                },
            },
            {
                $group:{
                    _id: '$month',
                    // incTotal: {$sum: { $multiply: ['$price', '$sle_qty'] }}
                    incTotal: {$sum: '$total'}
                }
            }
        ]);
        res.status(200).json(income);
    }catch(err){
        res.status(500).json({
            error:err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

module.exports = router;