const { Model } = require("objection");

class BaseModel extends Model {
  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

module.exports = BaseModel;
