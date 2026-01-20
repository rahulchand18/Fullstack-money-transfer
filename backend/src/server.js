import dotenv from "dotenv";
dotenv.config();
import "./db/knex.js";
import "./kafka/consumer.js";

import app from "./app.js";

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
