const BaseController = require('./baseController');
const Action = require('../models/actionModel');

class ActionController extends BaseController {
  constructor() {
    super(Action);
  }
}

module.exports = ActionController;