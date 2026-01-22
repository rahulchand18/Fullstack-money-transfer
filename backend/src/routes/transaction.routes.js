import Express from "express";
import {
  createTransaction,
  getTransactions,
  updateTransactionStatus,
} from "../controllers/transaction.controller.js";
import { jwtMiddleware } from "../middleware/auth.middleware.js";

const router = Express.Router();

router.use(jwtMiddleware);

router.post("/", createTransaction);
router.get("/", getTransactions);
router.put("/:id/status", updateTransactionStatus);

export default router;
