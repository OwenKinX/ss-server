const router = require('express').Router();
const Employee =  require('../../models/Employees');

router.get('/employees/reports', (req, res) => {
    Employee.aggregate([
        {
            $lookup:{
                from: 'emp-positions',
                localField: 'position',
                foreignField: 'ep_id',
                as: 'position'
            }
        },
        { $unwind:'$position' },
        {
            $project:{
                _id: 1,
                emp_id: 1,
                name: 1,
                surname: 1,
                phone: 1,
                province: 1,
                district: 1,
                village: 1,
                ep_id: '$position.ep_id',
                position: '$position.name'
            }
        }
    ]).exec((err, result) => {
        if(err){
            res.status(500).json({ message:err })
        }
        res.status(200).json(result)
    })
})

router.get('/employees/report', (req, res) => {
    const ep_id = req.query.ep_id;
    Employee.aggregate([
        {
            $match:{ position:ep_id }
        },
        {
            $lookup:{
                from: 'emp-positions',
                localField: 'position',
                foreignField: 'ep_id',
                as: 'position'
            }
        },
        { $unwind:'$position' },
        {
            $project:{
                _id: 1,
                emp_id: 1,
                name: 1,
                surname: 1,
                phone: 1,
                province: 1,
                district: 1,
                village: 1,
                ep_id: '$position.ep_id',
                position: '$position.name'
            }
        }
    ]).exec((err, result) => {
        if(err){
            res.status(500).json({ message:err.message })
        }
        res.status(200).json(result)
    })
})


module.exports = router;