const client = require('../databases/init.redis')


module.exports.set =async (key,value)=>{
   client.set(key,value,()=>{
    console.log('send success')
   })

}

module.exports.get =async (key) => {
    
    client.get(key, (err, value) => {
        console.log(value)
    })
    await client.quit();
    
}

