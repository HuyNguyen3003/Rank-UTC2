const express = require('express');
const router = express.Router();
const {send} = require('../services/Queuemsg')
const { waitForVariable } = require('../controller/user.Controller')




var resdata = 'xxx'




router.get('/update',async(req,res)=>{
    const mssv =  req.query.mssv
    send(process.env.NAME_QUEUE,mssv)
    waitForVariable(resdata)
    
    
    return res.status(200).json(resdata)
})


module.exports = router;