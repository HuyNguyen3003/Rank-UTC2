const amqplib = require('amqplib')

const urlamq = process.env.RABBITMQ_URL

module.exports.send = async (nameQueue, msg) => {

   
    try {
        const connection = await amqplib.connect(urlamq)
        const channel = await connection.createChannel()
        await channel.assertQueue(nameQueue, {
            durable: false
        })

        console.log('Connected to RabbitMQ')

        await channel.sendToQueue(nameQueue, Buffer.from(msg))
        console.log('send asscess')

        setTimeout(function () {
            connection.close();
            process.exit(0)
        }, 500);
    }
    catch (err) {
        console.log(`Error! Failed to connect to RabbitMQ: `, err)
    }
}


module.exports.get = async (nameQueue) => {

    try {
        const connection = await amqplib.connect(urlamq)
        const channel = await connection.createChannel()
        await channel.assertQueue(nameQueue, {
            durable: false
        })

        console.log('Connected to RabbitMQ')

        await channel.consume(nameQueue, msg => {
            console.log('Mgs:::', msg.content.toString())
        }), {
            noAck: true
        }

    }
    catch (err) {
        console.log(`Error! Failed to connect to RabbitMQ: `, err)
    }
}

