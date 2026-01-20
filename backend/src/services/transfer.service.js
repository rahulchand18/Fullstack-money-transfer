const Transaction = require("../models/Transaction");
const { calculateFee } = require("./fee.service");
const producer = require("../kafka/producer");

exports.transfer = async ({ senderId, receiverId, amountJpy }) => {
  const forexRate = 0.92;
  const amountNpr = amountJpy * forexRate;
  const fee = calculateFee(amountNpr);

  const payload = {
    sender_id: senderId,
    receiver_id: receiverId,
    amount_jpy: amountJpy,
    forex_rate: forexRate,
    amount_npr: amountNpr,
    service_fee_npr: fee,
  };

  await producer.send({
    topic: "transactions",
    messages: [{ value: JSON.stringify(payload) }],
  });
};
