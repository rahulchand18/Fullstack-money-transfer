import BaseModel from "./BaseModel.js";

export default class SenderReceiver extends BaseModel {
  static get tableName() {
    return "parties";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["type", "full_name", "country_code"],

      properties: {
        id: { type: "string", format: "uuid" },

        type: { enum: ["SENDER", "RECEIVER"] },

        country_code: {
          type: "string",
          enum: ["NP", "JP"],
        },

        full_name: { type: "string", minLength: 1 },
        email: { type: ["string", "null"], format: "email" },
        phone: { type: ["string", "null"] },
        address: { type: ["string", "null"] },

        is_active: { type: "boolean" },

        created_at: { type: ["string", "null"], format: "date-time" },
        updated_at: { type: ["string", "null"], format: "date-time" },
        deactivated_at: { type: ["string", "null"], format: "date-time" },
      },
    };
  }
}
