import redis from "./redis.js";

const verifyOTP = async (email, otp) => {
  const storedOtp = await redis.get(`otp:${email}`);

  if (!storedOtp || storedOtp !== otp) {
    throw new Error("Invalid or expired OTP");
  }

  return await redis.del(`otp:${email}`);
};

export default { verifyOTP };
