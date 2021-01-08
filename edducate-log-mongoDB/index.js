import { rabbitMQconsumer } from "./controller/rabbit_mq_consumer";
import mongoose from "mongoose";



connect_rabbitmq()

async function connect_rabbitmq() {
  
  try {
    var channelName = 'logChannel';
    //Connect MongoDB
    let uri =
      "mongodb+srv://aoguz:aoguz123456@cluster0.0elvz.mongodb.net/<dbname>?retryWrites=true&w=majority";
    mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      () => {
        console.log("db connect");
      }
    );
  
    await rabbitMQconsumer(channelName);
  } catch (error) {
    throw error;
  }
} 
