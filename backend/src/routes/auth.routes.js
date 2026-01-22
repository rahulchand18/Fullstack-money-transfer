import Express from "express";
import { requestOtp, verifyOTP } from "../controllers/auth.controller.js";
const router = Express.Router();

router.post("/login", requestOtp);
router.post("/verifyOTP", verifyOTP);

export default router;
