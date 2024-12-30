const mongoose = require('mongoose');
const BaseModel = require('./baseModel');

const menuSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String }
});

menuSchema.pre('save', async function (next) {
  try {
    this.code = this.code.toUpperCase();
    this.name = this.name.toUpperCase();
    next();
  } catch (err) {
    next(err);
  }
});

menuSchema.pre('findOneAndUpdate', async function (next) {
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

class Menu extends BaseModel {
  static SINGLE_LABEL = 'Menu';
  static PLURAL_LABEL = 'Menus';
}

module.exports = mongoose.model('Menu', menuSchema);