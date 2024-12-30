const express = require('express');
const { authenticateJWT, authorizeRoles } = require('../middleware/authenticate');
const RoleActionController = require('../controllers/roleActionController');
const roleActionController = new RoleActionController();

const router = express.Router();

router.post('/roleAction', authenticateJWT, authorizeRoles('ADMIN;ROLE_ACTION;CREATE'), roleActionController.create);
router.get('/roleAction', authenticateJWT, authorizeRoles('ADMIN;ROLE_ACTION;READ'), roleActionController.getAll);
router.get('/roleAction/:id', authenticateJWT, authorizeRoles('ADMIN;ROLE_ACTION;READ'), roleActionController.getById);
router.put('/roleAction/:id', authenticateJWT, authorizeRoles('ADMIN;ROLE_ACTION;UPDATE'), roleActionController.updateById);
router.delete('/roleAction/:id', authenticateJWT, authorizeRoles('ADMIN;ROLE_ACTION;DELETE'), roleActionController.deleteById);

module.exports = router;
