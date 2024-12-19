class BaseController {
    constructor(Model) {
        this.Model = Model;
    }

    create = async (req, res) => {
        try {
          const newObject = new this.Model(req.body);
          await newObject.save();
          res.status(201).json(newObject);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
    };

    getAll = async (req, res) => {
        try {
            const objects = await this.Model.find();
            res.status(200).json(objects);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    
    getById = async (req, res) => {
        try {
            const object = await this.Model.findById(req.params.id);
            if (!object) return res.status(404).json({ error: `${this.Model.SINGLE_LABEL} não encontrado` });
            res.status(200).json(object);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    
    updateById = async (req, res) => {
        try {
            const updatedObject = await this.Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!updatedObject) return res.status(404).json({ error: `${this.Model.SINGLE_LABEL} não encontrado(a)` });
            res.status(200).json(updatedObject);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
    
    deleteById = async (req, res) => {
        try {
            const deletedObject = await this.Model.findByIdAndDelete(req.params.id);
            if (!deletedObject) return res.status(404).json({ error: `${this.Model.SINGLE_LABEL} não encontrado(a)` });
            res.status(200).json({ message: `${this.Model.SINGLE_LABEL} deletado com sucesso` });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
      
}

module.exports = BaseController;