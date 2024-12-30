const mongoose = require('mongoose');
const BaseModel = require('./baseModel');

const roleSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String }
});

roleSchema.pre('save', async function (next) {
  try {
    this.code = this.code.toUpperCase();
    this.name = this.name.toUpperCase();
    next();
  } catch (err) {
    next(err);
  }
});

roleSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    
    try {
      if (update.code) {
        update.code = update.code.toUpperCase();
      }
      if (update.name) {
        update.name = update.name.toUpperCase();
      }
      this.setUpdate(update);
    } catch (err) {
        return next(err);
    }
    next();
});

class Role extends BaseModel {
  static SINGLE_LABEL = 'Permissão';
  static PLURAL_LABEL = 'Permissões';
}

module.exports = mongoose.model('Role', roleSchema);