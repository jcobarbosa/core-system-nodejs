const express = require('express');
const BASE_ROUTER = require('../controllers/userController');

const router = express.Router();

router.post('/users', BASE_ROUTER.create);
router.get('/users', BASE_ROUTER.getAll);
router.get('/users/:id', BASE_ROUTER.getById);
router.put('/users/:id', BASE_ROUTER.updateById);
router.delete('/users/:id', BASE_ROUTER.deleteById);

module.exports = router;
