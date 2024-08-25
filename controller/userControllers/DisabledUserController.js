const DisabledUserModel = require('../../models/userModels/DisablesUserModel');

class DisabledUserController {
  static async getAllDisabledUsers(req, res) {
    try {
      const [results] = await DisabledUserModel.getAllDisabledUsers();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: 'Database query failed' });
    }
  }

  static async activateUser(req, res) {
    const { userId } = req.params;
    try {
      await DisabledUserModel.activateUser(userId);
      res.status(200).json({ message: 'User activated successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to activate user' });
    }
  }
  static async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      await DisabledUserModel.deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
  
}

module.exports = DisabledUserController;
