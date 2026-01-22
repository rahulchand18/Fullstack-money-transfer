import Transaction from "../models/Transaction.js";
import { v4 as uuidv4 } from "uuid";

import { producer } from "../kafka/producer.js";

export async function createTransaction(req, res) {
  try {
    const { sender_id, receiver_id, amount } = req.body;

    const exchange_rate = 0.92;
    const converted_amount = amount * exchange_rate;

    let fee = 0;
    if (converted_amount <= 100000) fee = 500;
    else if (converted_amount <= 200000) fee = 1000;
    else fee = 3000;

    const total_payable = converted_amount + fee;

    const payload = {
      id: uuidv4(),
      sender_id,
      receiver_id,
      amount,
      currency: "JPY",
      exchange_rate,
      converted_amount,
      fee,
      total_payable,
      status: "PENDING",
      created_at: new Date().toISOString(),
    };

    await producer.send({
      topic: "transactions.send",
      messages: [{ value: JSON.stringify(payload) }],
    });

    res.status(202).json({
      success: true,
      message: "Transaction queued successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to process transaction",
    });
  }
}

export async function getTransactions(req, res) {
  try {
    const { startDate, endDate, sender_id, receiver_id } = req.query;

    const query = Transaction.query();

    if (startDate && endDate) {
      query.whereBetween("created_at", [
        new Date(startDate),
        new Date(endDate),
      ]);
    }

    if (sender_id) {
      query.where("sender_id", sender_id);
    }

    if (receiver_id) {
      query.where("receiver_id", receiver_id);
    }

    const transactions = await query.orderBy("created_at", "desc");

    res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
}

export async function updateTransactionStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const updated = await Transaction.query().patchAndFetchById(id, { status });

  res.json({ success: true, data: updated });
}
