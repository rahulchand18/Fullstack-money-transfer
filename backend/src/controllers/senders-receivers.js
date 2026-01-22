import { v4 as uuidv4 } from "uuid";
import SenderReceiver from "../models/Sender-Receiver.js";

export async function createSenderReceiver(req, res) {
  try {
    const { type, full_name, country_code, email, phone, address } = req.body;

    if (!type || !full_name || !country_code) {
      return res.status(400).json({
        success: false,
        message: "Type, full name and country code are required",
      });
    }

    const senderReceiver = await SenderReceiver.query().insert({
      id: uuidv4(),
      type,
      full_name,
      country_code,
      email,
      phone,
      address,
      is_active: true,
    });

    return res.status(201).json({
      success: true,
      data: senderReceiver,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create sender/receiver",
    });
  }
}

export async function getSenderReceivers(req, res) {
  try {
    const { type } = req.query;

    const query = SenderReceiver.query().where({ is_active: true });

    if (type) {
      query.andWhere({ type });
    }

    const parties = await query.orderBy("created_at", "desc");

    return res.json({
      success: true,
      data: parties,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch parties",
    });
  }
}

export async function getSenderReceiverById(req, res) {
  try {
    const senderReceiver = await SenderReceiver.query().findById(req.params.id);

    if (!senderReceiver) {
      return res.status(404).json({
        success: false,
        message: "Sender/Receiver not found",
      });
    }

    return res.json({
      success: true,
      data: senderReceiver,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sender/receiver",
    });
  }
}

export async function updateSenderReceiver(req, res) {
  try {
    const { id } = req.params;

    const senderReceiver = await SenderReceiver.query().findById(id);
    if (!senderReceiver) {
      return res.status(404).json({
        success: false,
        message: "Sender/Receiver not found",
      });
    }

    const updated = await SenderReceiver.query().patchAndFetchById(
      id,
      req.body,
    );

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update sender/receiver",
    });
  }
}

export async function deactivateSenderReceiver(req, res) {
  try {
    const { id } = req.params;

    const senderReceiver = await SenderReceiver.query().findById(id);
    if (!senderReceiver) {
      return res.status(404).json({
        success: false,
        message: "Sender/Receiver not found",
      });
    }

    await SenderReceiver.query().patchAndFetchById(id, {
      is_active: false,
      deactivated_at: new Date().toISOString(),
    });

    return res.json({
      success: true,
      message: "Sender/Receiver deactivated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to deactivate sender/receiver",
    });
  }
}
