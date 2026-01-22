import { Model } from "objection";

class BaseModel extends Model {
  $beforeValidate(jsonSchema, json) {
    for (const key of Object.keys(json)) {
      if (json[key] instanceof Date) {
        json[key] = json[key].toISOString();
      }
    }
    return jsonSchema;
  }

  $beforeInsert() {
    const now = new Date().toISOString();
    this.created_at = now;
    this.updated_at = now;
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

export default BaseModel;
