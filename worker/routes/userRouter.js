const express = require('express');
const router = express.Router();




router.get('/update',(req,res)=>{
    const mssv =  Number(req.query.mssv)
    
  


    return res.status(200).json(mssv)
})
router.post('/update', (req, res) => {
    const {data} = req.body







    return res.status(200).json('succsess')
})

module.exports = router;