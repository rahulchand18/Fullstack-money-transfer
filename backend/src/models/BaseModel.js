import { Model } from "objection";

class BaseModel extends Model {
  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

export default BaseModel;
