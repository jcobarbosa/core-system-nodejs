const express = require('express');
const UserController = require('../controllers/userController');
const userController = new UserController();

const router = express.Router();

router.post('/user', userController.create);
router.get('/user', userController.getAll);
router.get('/user/:id', userController.getById);
router.put('/user/:id', userController.updateById);
router.delete('/user/:id', userController.deleteById);

module.exports = router;
