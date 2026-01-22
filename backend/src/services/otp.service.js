import redis from "../utils/redis.js";

export async function generateOtp(email, rateLimitKey) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  await redis.set(`otp:${email}`, otp, "EX", 300);
  await redis.set(rateLimitKey, "1", "EX", 60);

  return otp;
}

export async function verifyOtp(email, otp) {
  const key = `otp:${email}`;

  const saved = await redis.get(key);
  if (!saved) return false;

  if (saved !== otp.toString()) return false;

  await redis.del(key);

  return true;
}
