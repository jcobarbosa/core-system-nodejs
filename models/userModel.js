const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nomeUsuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nomeReal: { type: String, required: true },
  dataDeNascimento: { type: Date, required: true },
  ativo: { type: Boolean, default: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    
    if (update.senha) {
        try {
            const salt = await bcrypt.genSalt(10);
            update.senha = await bcrypt.hash(update.senha, salt);
            this.setUpdate(update);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
