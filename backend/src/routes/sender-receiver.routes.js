import Express from "express";

import { jwtMiddleware } from "../middleware/auth.middleware.js";
import {
  createSenderReceiver,
  deactivateSenderReceiver,
  getSenderReceivers,
  getSenderReceiverById,
  updateSenderReceiver,
} from "../controllers/senders-receivers.js";

const router = Express.Router();

router.use(jwtMiddleware);

router.post("/", createSenderReceiver);
router.get("/", getSenderReceivers);
router.get("/:id", getSenderReceiverById);
router.put("/:id", updateSenderReceiver);
router.delete("/:id", deactivateSenderReceiver);

export default router;
