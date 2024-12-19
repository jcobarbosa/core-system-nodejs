const BaseController = require('./baseController');
const Role = require('../models/roleModel');

class RoleController extends BaseController {
  constructor() {
    super(Role);
  }
}

module.exports = RoleController;