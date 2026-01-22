import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to, otp) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: "Your Login OTP",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  });
}
