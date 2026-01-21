import kafka from "./client.js";
// import Transaction from "../models/Transaction.js";

const consumer = kafka.consumer({
  groupId: "transaction-consumer-group",
});

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "money-transactions",
    fromBeginning: false,
  });

  console.log("Kafka Consumer connected");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());

      //   await Transaction.query().insert(data);
    },
  });
};

export default { startConsumer };
