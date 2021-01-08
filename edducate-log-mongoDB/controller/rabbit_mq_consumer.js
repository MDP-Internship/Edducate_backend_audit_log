import amqp from "amqplib";
import { mongoAdd } from "../service/db_service";

export async function rabbitMQconsumer(channelName) {
  try {
    //RabbitMQ Consumer

    const connection = amqp.connect("amqp://localhost:5672");
    const channel = (await connection).createChannel();
    (await channel).assertQueue(channelName);

    console.log("Mesaj Bekleniyor...");

    (await channel).consume(channelName, (message) => {
      const messageInfo = JSON.parse(message.content.toString());
      
      const parseData = JSON.parse(messageInfo);
   
      //Write MongoDB
       mongoAdd(parseData);
    },{
      noAck: true
    });
  } catch (error) {
    throw error;
  }
}
