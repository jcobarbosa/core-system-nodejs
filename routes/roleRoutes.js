const express = require('express');
const { authenticateJWT, authorizeRoles } = require('../middleware/authenticate');
const RoleController = require('../controllers/roleController');
const roleController = new RoleController();

const router = express.Router();

router.post('/role', authenticateJWT, authorizeRoles('ADMIN;ROLE;CREATE'), roleController.create);
router.get('/role', authenticateJWT, authorizeRoles('ADMIN;ROLE;READ'), roleController.getAll);
router.get('/role/:id', authenticateJWT, authorizeRoles('ADMIN;ROLE;READ'), roleController.getById);
router.put('/role/:id', authenticateJWT, authorizeRoles('ADMIN;ROLE;UPDATE'), roleController.updateById);
router.delete('/role/:id', authenticateJWT, authorizeRoles('ADMIN;ROLE;DELETE'), roleController.deleteById);

module.exports = router;
