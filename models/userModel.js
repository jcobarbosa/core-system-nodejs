const BaseModel = require('./baseModel');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role', required: true }],
  active: { type: Boolean, default: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    
    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
            this.setUpdate(update);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

class User extends BaseModel {
  static SINGLE_LABEL = 'Usuário';
  static PLURAL_LABEL = 'Usuários';
}

module.exports = mongoose.model('User', userSchema);