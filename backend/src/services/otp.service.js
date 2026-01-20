const redis = require("ioredis")();

exports.generateOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  await redis.set(`otp:${email}`, otp, "EX", 300);
  return otp;
};

exports.verifyOtp = async (email, otp) => {
  const saved = await redis.get(`otp:${email}`);
  return saved === otp;
};
