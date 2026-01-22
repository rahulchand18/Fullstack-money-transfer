import { startConsumer } from "./kafka/consumer.js";

startConsumer()
  .then(() => console.log("Kafka consumer running"))
  .catch(console.error);
