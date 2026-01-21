import express, { json } from "express";
import cors from "cors";
import router from "./routes/router.js";
import redis from "./utils/redis.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.get("/health", (_, res) => res.send("OK"));
app.get("/health/redis", async (req, res) => {
  await redis.ping();
  res.send("Redis OK");
});

export default app;
