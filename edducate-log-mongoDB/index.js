import express from "express";
import mongoose from "mongoose";
import amqp from "amqplib/callback_api";
import UserLog from "./model/UserLog";


try {
  let uri =
    "mongodb+srv://aoguz:aoguz123456@cluster0.0elvz.mongodb.net/<dbname>?retryWrites=true&w=majority";
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log("db connect");
    }
  );

  amqp.connect("amqp://localhost:5672", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = "logChannel";

      channel.assertQueue(queue, {
        durable: true,
      });

      console.log(
        "Mesaj bekleniyor...",
        queue
      );

      channel.consume(
        queue,
        function (data) {
         let person = JSON.parse(data.content.toString());
          var parseData= JSON.parse(person);
          console.log(parseData);
          //Write MongoDB
          var personLog = new UserLog({
            name: parseData.name,
            surname : parseData.surname,
            email : parseData.email,
            password: parseData.password
          });

          console.log(personLog);
          personLog
            .save()
            .then((data) => {
              console.log(data);
            })
            .catch((err) => console.log(err));
          //--------------------
        },
        {
          noAck: true,
        }
      );
    });
  });
} catch (error) {
  console.log("error consumer: " + error);
  throw error;
}
