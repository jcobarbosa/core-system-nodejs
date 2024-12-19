const express = require('express');
const RoleController = require('../controllers/roleController');
const roleController = new RoleController();

const router = express.Router();

router.post('/roles', roleController.create);
router.get('/roles', roleController.getAll);
router.get('/roles/:id', roleController.getById);
router.put('/roles/:id', roleController.updateById);
router.delete('/roles/:id', roleController.deleteById);

module.exports = router;
