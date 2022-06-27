const router = require('express').Router();
const SaleDetail = require('../../models/SaleDetail');
const logger = require('../../utils/logger');

//total income in present month
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
                    total:{ $multiply: ['$price', '$qty'] },
                },
            },
            {
                $group:{
                    _id: '$month',
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

router.get('/income/daily', async(req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    try{
        const income = await SaleDetail.aggregate([
            {
                $match:{
                    createdAt: {
                        $gte: firstDay,
                        $lte: lastDay
                    }
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString: {
                            format: '%d-%m-%Y', date: '$createdAt'
                        }
                    },
                    totalIncomeAmount: { $sum: { $multiply: [ "$price", "$qty" ] } },
                    // count: { $sum: 1}
                }
            },
            {
                $sort: {
                    _id: 1
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

router.get('/income/monthly', async(req, res) => {
    try{
        const income = await SaleDetail.aggregate([
            // {
            //     $match:{
            //         createdAt: {
            //             $lte: new Date()
            //         }
            //     }
            // },
            {
                $group:{
                    // _id:{
                    //     month: {
                    //         $month: '$createdAt'
                    //     }
                    // },
                    _id:{
                        $month: '$createdAt'
                    },
                    totalIncomeAmount: { $sum: { $multiply: [ "$price", "$qty" ] } },
                    count: { $sum: 1}
                }
            },
            {
                $sort: {
                    _id: 1
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
});

router.get('/income/sixmonth', async(req, res) => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(),0);
    const lastDay = new Date(now.getFullYear(),+6,0);

    try{
        const income = await SaleDetail.aggregate([
            {
                $match:{
                    createdAt: {
                        $gte: firstDay,
                        $lte: lastDay
                    }
                }
            },
            {
                $group:{
                    // _id:{
                    //     month: {
                    //         $month: '$createdAt'
                    //     }
                    // },
                    _id:{
                        $month: '$createdAt'
                    },
                    totalIncomeAmount: { $sum: { $multiply: [ "$price", "$qty" ] } },
                    count: { $sum: 1}
                }
            },
            {
                $sort: {
                    _id: 1
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
});

router.get('/income/yearly', async(req, res) => {
    try{
        const income = await SaleDetail.aggregate([
            // {
            //     $match:{
            //         createdAt: {
            //             $lte: new Date()
            //         }
            //     }
            // },
            {
                $group:{
                    // _id:{
                    //     month: {
                    //         $month: '$createdAt'
                    //     }
                    // },
                    _id:{
                        $year: '$createdAt'
                    },
                    totalIncomeAmount: { $sum: { $multiply: [ "$price", "$qty" ] } },
                    count: { $sum: 1}
                }
            },
            {
                $sort: {
                    _id: 1
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