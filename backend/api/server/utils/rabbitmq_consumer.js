import amqp, { connect } from 'amqplib'

 export async function connect_rabbitmq(logChannel, data){
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    console.log('connection done' +connection);
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(logChannel);

    channel.sendToQueue(logChannel, Buffer.from(JSON.stringify(data)))
    console.log('data : '+ data)
  } catch (err) {
    throw err
  }
  
}