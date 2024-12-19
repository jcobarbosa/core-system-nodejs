const express = require('express');
const BASE_ROUTER = require('../controllers/roleController');

const router = express.Router();

router.post('/roles', BASE_ROUTER.create);
router.get('/roles', BASE_ROUTER.getAll);
router.get('/roles/:id', BASE_ROUTER.getById);
router.put('/roles/:id', BASE_ROUTER.updateById);
router.delete('/roles/:id', BASE_ROUTER.deleteById);

module.exports = router;
