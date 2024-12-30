const BaseController = require('./baseController');
const Menu = require('../models/menuModel');

class MenuController extends BaseController {
  constructor() {
    super(Menu);
  }
}

module.exports = MenuController;