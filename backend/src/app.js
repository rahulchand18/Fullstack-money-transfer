import express, { json } from "express";
import cors from "cors";
import router from "./routes/router.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.get("/health", (_, res) => res.send("OK"));

export default app;
