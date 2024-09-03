// models/ActiveAdminModel.js
const db = require('../../config/db');

class ActiveAdminModel {
  static getActiveAdmins() {
    return db.query('SELECT id, username, email, role FROM users WHERE role = "admin"');
  }

  static async disableAdmin(adminId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insert into disableAdmins, excluding superadmin
      await connection.query(`
        INSERT INTO disableusers (id, username, email, role)
        SELECT id, username, email, role 
        FROM users 
        WHERE id = ? AND role = "admin"
      `, [adminId]);

      // Delete from users, excluding superadmin
      await connection.query('DELETE FROM users WHERE id = ? AND role = "admin"', [adminId]);

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = ActiveAdminModel;
