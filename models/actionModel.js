const mongoose = require('mongoose');
const BaseModel = require('./baseModel');

const actionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String }
});

actionSchema.pre('save', async function (next) {
  try {
    this.code = this.code.toUpperCase();
    this.name = this.name.toUpperCase();
    next();
  } catch (err) {
    next(err);
  }
});

actionSchema.pre('findOneAndUpdate', async function (next) {
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

class Action extends BaseModel {
  static SINGLE_LABEL = 'Ação';
  static PLURAL_LABEL = 'Ações';
}

module.exports = mongoose.model('Action', actionSchema);