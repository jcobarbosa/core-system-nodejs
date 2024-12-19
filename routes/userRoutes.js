const express = require('express');
const UserController = require('../controllers/userController');
const userController = new UserController();

const router = express.Router();

router.post('/users', userController.create);
router.get('/users', userController.getAll);
router.get('/users/:id', userController.getById);
router.put('/users/:id', userController.updateById);
router.delete('/users/:id', userController.deleteById);

module.exports = router;
