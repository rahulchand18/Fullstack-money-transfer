import { Kafka } from "kafkajs";
import "../db/knex.js";
import Transaction from "../models/Transaction.js";
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: "transaction-consumer",
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: "transaction-group" });

export async function startConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: "transactions.send",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());

      console.log("Consuming transaction:", data.id);

      await Transaction.query().insert({
        id: data.id,
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        amount: data.amount,
        currency: data.currency,
        exchange_rate: data.exchange_rate,
        converted_amount: data.converted_amount,
        fee: data.fee,
        total_payable: data.total_payable,
        status: data.status,
        created_at: data.created_at,
      });
    },
  });
}
