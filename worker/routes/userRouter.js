const express = require('express');
const router = express.Router();
const {send} = require('../services/Queuemsg')
const { waitForVariable } = require('../controller/user.Controller')




var resdata = 'xxx'




router.get('/update',async(req,res)=>{

    // client dùng api :5000/update để gửi yêu cầu tới services phụ
    const mssv =  req.query.mssv
    
    ///  send msg vào rabbitmq để gửi tới services chính
    send(process.env.NAME_QUEUE,mssv)

    //

    // chờ nhận data từ services chính thông qua mesqueue rồi return
   
    //
    
    return res.status(200).json(resdata)
})

//






module.exports = router;