const User = require('../models/userModel');

exports.create = async (req, res) => {
  try {
    const newObject = new User(req.body);
    await newObject.save();
    res.status(201).json(newObject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const objects = await User.find();
    res.status(200).json(objects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const object = await User.findById(req.params.id);
    if (!object) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json(object);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateById = async (req, res) => {
  try {
    const updatedObject = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedObject) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json(updatedObject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const deleteObject = await User.findByIdAndDelete(req.params.id);
    if (!deleteObject) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
