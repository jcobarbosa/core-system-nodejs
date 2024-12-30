const express = require('express');
const { authenticateJWT, authorizeRoles } = require('../middleware/authenticate');
const MenuController = require('../controllers/menuController');
const menuController = new MenuController();

const router = express.Router();

router.post('/menu', authenticateJWT, authorizeRoles('ADMIN;MENU;CREATE'), menuController.create);
router.get('/menu', authenticateJWT, authorizeRoles('ADMIN;MENU;READ'), menuController.getAll);
router.get('/menu/:id', authenticateJWT, authorizeRoles('ADMIN;MENU;READ'), menuController.getById);
router.put('/menu/:id', authenticateJWT, authorizeRoles('ADMIN;MENU;UPDATE'), menuController.updateById);
router.delete('/menu/:id', authenticateJWT, authorizeRoles('ADMIN;MENU;DELETE'), menuController.deleteById);

module.exports = router;
