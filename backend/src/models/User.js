import BaseModel from "./BaseModel.js";

export default class User extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],
      properties: {
        id: { type: "string", format: "uuid" },
        email: { type: "string", format: "email" },
        full_name: { type: "string", minLength: 1 },
        is_active: { type: "boolean" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: ["string", "null"], format: "date-time" },
        deactivated_at: { type: ["string", "null"], format: "date-time" },
      },
    };
  }
}
