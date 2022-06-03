const router = require('express').Router();
const Employee =  require('../../models/Employees');

router.get('/employees/report', (req, res) => {
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

module.exports = router;