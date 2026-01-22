import BaseModel from "./BaseModel.js";

export default class Transaction extends BaseModel {
  static get tableName() {
    return "transactions";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "sender_id",
        "receiver_id",
        "amount",
        "currency",
        "exchange_rate",
        "total_payable",
      ],
      properties: {
        id: { type: "string", format: "uuid" },

        sender_id: { type: "string", format: "uuid" },
        receiver_id: { type: "string", format: "uuid" },

        amount: { type: "number" },
        currency: { enum: ["JPY", "NPR"] },
        exchange_rate: { type: "number" },

        fee: { type: ["number", "null"] },
        total_payable: { type: "number" },

        status: {
          enum: ["PENDING", "COMPLETED", "FAILED"],
        },

        remarks: { type: ["string", "null"] },

        created_at: { type: ["string", "null"], format: "date-time" },
        updated_at: { type: ["string", "null"], format: "date-time" },
      },
    };
  }
}
