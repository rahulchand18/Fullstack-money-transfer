import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "money-transfer-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  connectionTimeout: 3000,
  retry: {
    retries: 5,
  },
});

export default kafka;
