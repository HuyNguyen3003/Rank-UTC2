const express = require('express')
const app = express()



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/userRouter'))






app.listen(5000, () => {
    console.log('Get running at 5000')
})