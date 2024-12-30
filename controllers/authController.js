const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const RoleAction = require('../models/roleActionModel');

class AuthController {
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email }).populate({ path: 'roles', select: 'code' });
      if (!user) return res.status(404).json({ error: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const roleAction = await RoleAction
                                    .find({ active: true, negative: false, role: { $in: user.roles.map(role => role._id) }})
                                    .populate({ path: 'role', select: 'code' })
                                    .populate({ path: 'menu', select: 'code' })
                                    .populate({ path: 'action', select: 'code' });
      if (!roleAction) return res.status(404).json({ error: 'User without roles and actions' });

      const payload = {
        userId: user._id,
        roles: roleAction.map(r => `${r.role.code};${r.menu.code};${r.action.code}`),
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
  };

  refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Access denied' });

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const payload = {
        userId: decoded.userId,
        roles: decoded.roles,
      };
      const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token: newToken });
    } catch (err) {
      res.status(400).json({ error: 'Invalid refresh token' });
    }
  };
}

module.exports = new AuthController();