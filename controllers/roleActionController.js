const BaseController = require('./baseController');
const RoleAction = require('../models/roleActionModel');

class RoleActionController extends BaseController {
  constructor() {
    super(RoleAction);
  }
}

module.exports = RoleActionController;