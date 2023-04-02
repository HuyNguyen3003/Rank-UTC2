const express = require('express');
const router = express.Router();
const Controller = require('../controllers/index.controller')




router.route('/apiV1/check')
.get((req,res)=>{
    return res.status(200).json({
        status: 'success',
        message: 'api ok'
    })
})
.post((req, res) =>{
    const data =  Controller.check(req.body)
    return res.status(200).json({
        status: 'success',
        message: 'api ok',
        data : `uwwu - ${data.data}`
    })
})




module.exports = router;