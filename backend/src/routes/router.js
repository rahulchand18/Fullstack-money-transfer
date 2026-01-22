import Express from "express";
const router = Express.Router();
import redis from "../utils/redis.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

router.get("", async (req, res) => {
  await redis.set("test:key", "hello", "EX", 60);
  const value = await redis.get("test:key");

  return res.status(200).send({ success: true, message: "API Working!!" });
});
router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);

export default router;
