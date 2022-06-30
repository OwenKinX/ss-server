const router = require('express').Router();
const SaleDetail = require('../../models/SaleDetail');
const logger = require('../../utils/logger');

//total income in present month
router.get('/income/report', async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await SaleDetail.aggregate([
            {
                $match: {
                    createdAt: { $gte: prevMonth }
                }
            },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    total: { $multiply: ['$price', '$qty'] },
                },
            },
            {
                $group: {
                    _id: '$month',
                    incTotal: { $sum: '$total' }
                }
            }
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

router.get('/income/daily', async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    try {
        const income = await SaleDetail.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: firstDay,
                        $lte: lastDay
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%d-%m-%Y', date: '$createdAt'
                        }
                    },
                    totalIncomeAmount: { $sum: { $multiply: ["$price", "$qty"] } },
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
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

router.get('/income/daily/list', async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    try {
        const income = await SaleDetail.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: firstDay,
                        $lte: lastDay
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%d-%m-%Y', date: '$createdAt'
                        }
                    },
                    totalIncomeAmount: { $sum: { $multiply: ["$price", "$qty"] } },
                    totalQty: { $sum: '$qty' },
                    count: { $sum: 1 }   //ລາຍການ
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

router.get('/income/monthly', async (req, res) => {

    const monthyear = new Date(req.query.month);
    const _month = new Date(monthyear.getMonth()+1);
    const _year = new Date(monthyear.getFullYear());
    const monthly = Number(_month);
    const year = Number(_year);

    try {
        const income = await SaleDetail.aggregate([
            {
                $project:{
                    "totalAmount": { $multiply: ['$price', '$qty'] },
                    "ttqty": "$qty",
                    "day":{
                        $dayOfMonth:"$createdAt"
                    },
                    "month":{
                        $month:"$createdAt"
                    },
                    "year":{
                        $year:"$createdAt"
                    }
                }
            },
            {
                $match:{
                    "month": monthly,
                    "year": year
                }
            },
            {
                $group:{
                    "_id": "$day",
                    "date":{
                        $first: "$day"
                    },
                    "month":{
                        $first: "$month"
                    },
                    "year":{
                        $first: "$year"
                    },
                    "totalQty": { $sum: '$ttqty'},
                    "incomeTotal":{
                        $sum:"$totalAmount"
                    }
                }
            },
            {
                $project:{
                    "_id":0,
                    "date":1,
                    "month":1,
                    "year":1,
                    "totalQty":1,
                    "incomeTotal":1
                }
            },
            {
                $sort:{
                    date: 1
                }
            }
        ])
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

router.get('/income/sixmonth', async (req, res) => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), 0);
    const lastDay = new Date(now.getFullYear(), +6, 0);

    try {
        const income = await SaleDetail.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: firstDay,
                        $lte: lastDay
                    }
                }
            },
            {
                $group: {
                    // _id:{
                    //     month: {
                    //         $month: '$createdAt'
                    //     }
                    // },
                    _id: {
                        $month: '$createdAt'
                    },
                    totalIncomeAmount: { $sum: { $multiply: ["$price", "$qty"] } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
});

router.get('/income/yearly', async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), 0);
    const lastDay = new Date(date.getFullYear(), 12, 0);
    try {
        const income = await SaleDetail.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: firstDay,
                        $lte: lastDay
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $month: '$createdAt'
                    },
                    totalIncomeAmount: { $sum: { $multiply: ["$price", "$qty"] } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
        logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
})

module.exports = router;