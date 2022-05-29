const router = require('express').Router();
const Sale = require('../../models/Sale');

router.get('/sale/report', (req,res) => {
    Sale.aggregate([
        {
            $lookup:{
                from: 'customers',
                localField: 'customer',
                foreignField: 'cus_id',
                as:'customer'
            }
        },
        { $unwind: '$customer' },
        {
            $lookup:{
                from: 'employees',
                localField: 'employee',
                foreignField: 'emp_id',
                as: 'employee',
            }
        },
        { $unwind: '$employee' },
        {
            $project:{
                _id:1,
                inv_no:1,
                cash:1,
                date:1,
                customer:'$customer.name',
                employee:'$employee.name'
            }
        }
    ]).exec((err, result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(500).json({ message:err })
        }
    })
})

module.exports = router;