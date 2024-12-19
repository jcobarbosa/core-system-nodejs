const BaseController = require('./baseController');
const User = require('../models/userModel');

class UserController extends BaseController {
  constructor() {
    super(User);
  }
}

module.exports = UserController;