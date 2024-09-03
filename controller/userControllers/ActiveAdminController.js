// controllers/ActiveAdminController.js
const ActiveAdminModel = require('../../models/userModels/ActiveAdminModel');

class ActiveAdminController {
  static async getActiveAdmins(req, res) {
    try {
      const [results] = await ActiveAdminModel.getActiveAdmins();
      res.json(results);
    } catch (err) {
      console.error('Error fetching admins:', err);
      res.status(500).json({ error: 'Database query failed' });
    }
  }

  static async disableAdmin(req, res) {
    const { adminId } = req.params;
    try {
      await ActiveAdminModel.disableAdmin(adminId);
      res.status(200).json({ message: 'Admin disabled successfully' });
    } catch (err) {
      console.error('Error disabling admin:', err);
      res.status(500).json({ error: 'Failed to disable admin' });
    }
  }
}

module.exports = ActiveAdminController;
