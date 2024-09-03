// controllers/ActiveUserController.js
const ActiveUserModel = require('../../models/userModels/ActiveUserModel');

class ActiveUserController {
  static async getAllUsers(req, res) {
    try {
      const [results] = await ActiveUserModel.getAllUsers();
      res.json(results);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Database query failed' });
    }
  }

  static async disableUser(req, res) {
    const { userId } = req.params;
    try {
      await ActiveUserModel.disableUser(userId);
      res.status(200).json({ message: 'User disabled successfully' });
    } catch (err) {
      console.error('Error disabling user:', err);
      res.status(500).json({ error: 'Failed to disable user' });
    }
  }
}

module.exports = ActiveUserController;
