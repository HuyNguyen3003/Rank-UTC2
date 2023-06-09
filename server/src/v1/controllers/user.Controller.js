
const amqplib = require('amqplib')
const axios = require('axios')
//const { getStudentInfo } = require('../services/read.service')






const handleFlow = async (nameQueue) => {

    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(nameQueue, {
            durable: false
        })
        console.log('Connected to RabbitMQ')

        await channel.consume (nameQueue,async(msg) => {

            const msgMssv = msg.content.toString()
            

            // flow

            // call api get data



            //
            if (msgMssv){
                try {
                    //  data -> client
                    

                } catch (error) {
                    console.log(`API error: ${error.message}`)
                }
            }
  

            
        }), {
            noAck: true
        }


    }
    catch (err) {
        console.log(`Error! Failed to connect to RabbitMQ: `, err)
    }
}






handleFlow(process.env.NAME_QUEUE)
