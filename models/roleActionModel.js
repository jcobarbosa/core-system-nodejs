const BaseModel = require('./baseModel');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleActionSchema = new mongoose.Schema({
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  menu: { type: Schema.Types.ObjectId, ref: 'Menu' },
  action: { type: Schema.Types.ObjectId, ref: 'Action' },
  active: { type: Boolean, default: true },
  negative: { type: Boolean, default: false }
});

class RoleAction extends BaseModel {
  static SINGLE_LABEL = 'Ação';
  static PLURAL_LABEL = 'Ações';
}

module.exports = mongoose.model('RoleAction', roleActionSchema);