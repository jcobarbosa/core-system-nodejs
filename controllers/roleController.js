const Role = require('../models/roleModel');

exports.create = async (req, res) => {
  try {
    const newObject = new Role(req.body);
    await newObject.save();
    res.status(201).json(newObject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const objects = await Role.find();
    res.status(200).json(objects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const object = await Role.findById(req.params.id);
    if (!object) return res.status(404).json({ error: 'Role não encontrado' });
    res.status(200).json(object);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateById = async (req, res) => {
  try {
    const updatedObject = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedObject) return res.status(404).json({ error: 'Role não encontrado' });
    res.status(200).json(updatedObject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const deletedObject = await Role.findByIdAndDelete(req.params.id);
    if (!deletedObject) return res.status(404).json({ error: 'Role não encontrado' });
    res.status(200).json({ message: 'Role deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
