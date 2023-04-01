const express = require('express')
const LocalStorage = require('node-localstorage').LocalStorage;



const app = express();
const localStorage = new LocalStorage('./scratch');



app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

require('./services')



app.get('/',(req,res)=>{
    if (localStorage.getItem('time'))
    return res.json(localStorage.getItem('time'))
     else
         return res.json('xxx')

})


app.listen(5000,()=>{
    console.log('server is running at 5000')
})