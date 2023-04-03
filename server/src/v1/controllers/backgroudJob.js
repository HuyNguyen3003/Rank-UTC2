const cron = require('node-cron');
const { updateCourse, 
    updateClass, 
    updateStudent,
    updateScore,
    updateAllClass,
    updateAllStudent,
    updateAllScore, } = require('../services/update.service')



cron.schedule('0 5 * * *',async () => {
 

     await updateAllClass()
     await updateAllStudent()
    await updateAllScore()


   
    console.log('Chạy tác vụ mỗi 5 giờ sáng');
});