const express = require('express')
const app = express()
require('dotenv').config();



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/userRouter'))

app.get('/',(req,res)=>{
return res.status(200).json("hello")
})






app.listen(5000, function () {
    console.log("Server is running on port " + 5000);
});