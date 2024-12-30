const express = require('express');
const { authenticateJWT, authorizeRoles } = require('../middleware/authenticate');
const ActionController = require('../controllers/actionController');
const actionController = new ActionController();

const router = express.Router();

router.post('/action', authenticateJWT, authorizeRoles('ADMIN;ACTION;CREATE'), actionController.create);
router.get('/action', authenticateJWT, authorizeRoles('ADMIN;ACTION;READ'), actionController.getAll);
router.get('/action/:id', authenticateJWT, authorizeRoles('ADMIN;ACTION;READ'), actionController.getById);
router.put('/action/:id', authenticateJWT, authorizeRoles('ADMIN;ACTION;UPDATE'), actionController.updateById);
router.delete('/action/:id', authenticateJWT, authorizeRoles('ADMIN;ACTION;DELETE'), actionController.deleteById);

module.exports = router;
