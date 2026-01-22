import User from "../models/User.js";
import crypto from "crypto";
import { sendOtpEmail } from "../services/mail.service.js";
import redis from "../utils/redis.js";
import { generateToken } from "../utils/jwt.js";
import { generateOtp, verifyOtp } from "../services/otp.service.js";

export async function requestOtp(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.query().where({ email, is_active: true }).first();

    if (!user) {
      return res.status(401).json({ message: "User not found or inactive" });
    }

    const rateLimitKey = `otp:lock:${email}`;
    const isLocked = await redis.get(rateLimitKey);

    if (isLocked) {
      return res.status(429).json({
        message: "Please wait 1 minute before requesting another OTP",
      });
    }

    const otp = await generateOtp(email, rateLimitKey);

    if (process.env.SEND_EMAILS === "true") {
      await sendOtpEmail(email, otp);
    } else {
      console.log("Sending Mail Disabled!!");
    }

    console.log(`OTP: ${otp}`);

    return res.json({
      message: "OTP sent to registered email",
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;
    const verified = await verifyOtp(email, otp);
    if (!verified) {
      return res
        .status(400)
        .send({ success: true, message: "OTP invalid or expired." });
    }
    const user = await User.query().where({ email, is_active: true }).first();

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "User not found or inactive" });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return res.status(200).send({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: error.message });
  }
}
