import kafka from "../config/kafka";

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("✅ Kafka Producer connected");
};

const sendTransactionEvent = async (payload) => {
  await producer.send({
    topic: "money-transactions",
    messages: [
      {
        key: payload.transactionId,
        value: JSON.stringify(payload),
      },
    ],
  });
};

export default {
  connectProducer,
  sendTransactionEvent,
};
